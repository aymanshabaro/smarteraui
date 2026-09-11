"use client";

import type { KeyboardEvent, PointerEvent, ReactNode, RefObject } from "react";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import {
    Button as AriaButton,
    ColorField as AriaColorField,
    ColorSwatch as AriaColorSwatch,
    Input as AriaInput,
    TextField as AriaTextField,
} from "react-aria-components";
import { ChevronDown, Minus, Plus, SwitchHorizontal01 } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Dropdown } from "../../base/dropdown/dropdown";
import type { GradientPreset, GradientStop, GradientStopInput, GradientType } from "./gradient-picker-utils";
import { clamp, getAngleFromPoint, getColorAtPosition, getGradientEndpoints, normalizeAngle, sortGradientStops, toGradientCSS } from "./gradient-picker-utils";

export type { GradientPreset, GradientStop, GradientType } from "./gradient-picker-utils";
export { toGradientCSS } from "./gradient-picker-utils";

/** A gradient always keeps at least this many stops. */
const MIN_STOPS = 2;

const styles = sortCx({
    common: {
        area: "relative aspect-square w-full rounded-lg",
        areaSurface: "ring-alpha-black/10 absolute inset-0 overflow-hidden rounded-lg ring-[0.5px] ring-inset",
        track: "ring-alpha-black/10 relative h-3 w-full cursor-pointer rounded-full ring-[0.5px] ring-inset",
        thumb: "border-fg-white outline-focus-ring absolute size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-[3px] shadow-md outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 active:cursor-grabbing",
        // Shared shell for every field box: the ring/focus treatment of `base/input` without its layout.
        fieldBox:
            "bg-primary ring-primary focus-within:ring-brand relative flex place-content-center place-items-center transition-shadow duration-100 ease-linear ring-1 ring-inset focus-within:z-10 focus-within:ring-2",
        fieldInput: "text-primary w-full min-w-0 bg-transparent text-sm outline-hidden",
        fieldSwatch: "ring-alpha-black/10 size-4 shrink-0 rounded-full ring-1 ring-inset",
        sectionHeader: "flex items-center gap-3",
        sectionTitle: "text-secondary flex-1 text-sm font-semibold",
        presetSwatch:
            "ring-alpha-black/10 focus-visible:outline-focus-ring size-5 cursor-pointer rounded-full ring-1 transition duration-100 ease-linear ring-inset hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2",
    },
});

const TYPE_ITEMS: { id: GradientType; label: string }[] = [
    { id: "linear", label: "Linear" },
    { id: "radial", label: "Radial" },
    { id: "angular", label: "Angular" },
    { id: "diamond", label: "Diamond" },
];

const TYPE_LABELS = Object.fromEntries(TYPE_ITEMS.map((item) => [item.id, item.label])) as Record<GradientType, string>;

/* -------------------------------------------------------------------------------------------------
 * Context
 * ----------------------------------------------------------------------------------------------- */

interface GradientPickerContextValue {
    /** The stops, always sorted by ascending position. */
    stops: GradientStop[];
    type: GradientType;
    angle: number;
    /** The stop the user last touched — `Delete`/`Backspace` removes it. */
    selectedStopId: string | null;
    /** The current gradient as a CSS `background` value. */
    css: string;
    setType: (type: GradientType) => void;
    setAngle: (angle: number) => void;
    setSelectedStopId: (id: string | null) => void;
    updateStop: (id: string, patch: Partial<Omit<GradientStop, "id">>) => void;
    addStop: (position?: number) => void;
    removeStop: (id: string) => void;
    reverse: () => void;
    applyPreset: (preset: GradientPreset) => void;
}

const GradientPickerContext = createContext<GradientPickerContextValue | null>(null);

/** Reads the gradient state provided by `GradientPicker.Provider`. */
export const useGradientPicker = () => {
    const context = useContext(GradientPickerContext);

    if (!context) {
        throw new Error("useGradientPicker() must be used inside a <GradientPicker.Provider>.");
    }

    return context;
};

/* -------------------------------------------------------------------------------------------------
 * Provider
 * ----------------------------------------------------------------------------------------------- */

const withIds = (stops: GradientStopInput[], prefix: string): GradientStop[] => stops.map((stop, index) => ({ ...stop, id: stop.id ?? `${prefix}-${index}` }));

export interface GradientPickerProviderProps {
    /** The stops rendered when the picker is uncontrolled. */
    defaultStops?: GradientStopInput[];
    /** The stops rendered when the picker is controlled. */
    stops?: GradientStopInput[];
    /** Called with the full sorted stop list whenever a stop is added, moved, edited or removed. */
    onStopsChange?: (stops: GradientStop[]) => void;
    /**
     * The gradient shape shown when the picker is uncontrolled.
     * @default "linear"
     */
    defaultType?: GradientType;
    /** Called when the user picks a different gradient shape. */
    onTypeChange?: (type: GradientType) => void;
    /**
     * The gradient angle, in CSS degrees, when the picker is uncontrolled.
     * @default 135
     */
    defaultAngle?: number;
    /** Called when the angle is changed by dragging an endpoint or with the keyboard. */
    onAngleChange?: (angle: number) => void;
    children: ReactNode;
}

const GradientPickerProvider = ({
    defaultStops = [
        { color: "#7F56D9", position: 0 },
        { color: "#432E73", position: 100 },
    ],
    stops: controlledStops,
    onStopsChange,
    defaultType = "linear",
    onTypeChange,
    defaultAngle = 135,
    onAngleChange,
    children,
}: GradientPickerProviderProps) => {
    const [uncontrolledStops, setUncontrolledStops] = useState(() => withIds(defaultStops, "stop"));
    const [type, setTypeState] = useState(defaultType);
    const [angle, setAngleState] = useState(() => normalizeAngle(defaultAngle));
    const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
    // Monotonic so a new stop never reuses an id that is still on screen.
    const nextStopId = useRef(defaultStops.length);

    const stops = useMemo(
        () => sortGradientStops(controlledStops ? withIds(controlledStops, "stop") : uncontrolledStops),
        [controlledStops, uncontrolledStops],
    );

    const commitStops = useCallback(
        (next: GradientStop[]) => {
            const sorted = sortGradientStops(next);

            if (!controlledStops) setUncontrolledStops(sorted);
            onStopsChange?.(sorted);
        },
        [controlledStops, onStopsChange],
    );

    const value = useMemo<GradientPickerContextValue>(() => {
        const createId = () => `stop-${nextStopId.current++}`;

        return {
            stops,
            type,
            angle,
            selectedStopId,
            css: toGradientCSS(stops, { type, angle }),
            setSelectedStopId,
            setType: (next) => {
                setTypeState(next);
                onTypeChange?.(next);
            },
            setAngle: (next) => {
                const normalized = normalizeAngle(next);

                setAngleState(normalized);
                onAngleChange?.(normalized);
            },
            updateStop: (id, patch) => commitStops(stops.map((stop) => (stop.id === id ? { ...stop, ...patch } : stop))),
            addStop: (position) => {
                const nextPosition = clamp(Math.round(position ?? 50), 0, 100);
                const id = createId();

                commitStops([...stops, { id, color: getColorAtPosition(stops, nextPosition), position: nextPosition }]);
                setSelectedStopId(id);
            },
            removeStop: (id) => {
                if (stops.length <= MIN_STOPS) return;

                commitStops(stops.filter((stop) => stop.id !== id));
                setSelectedStopId(null);
            },
            reverse: () => commitStops(stops.map((stop) => ({ ...stop, position: 100 - stop.position }))),
            applyPreset: (preset) => {
                commitStops(withIds(preset.stops, preset.id));

                if (preset.type) {
                    setTypeState(preset.type);
                    onTypeChange?.(preset.type);
                }

                if (preset.angle !== undefined) {
                    const normalized = normalizeAngle(preset.angle);

                    setAngleState(normalized);
                    onAngleChange?.(normalized);
                }
            },
        };
    }, [stops, type, angle, selectedStopId, commitStops, onTypeChange, onAngleChange]);

    return <GradientPickerContext.Provider value={value}>{children}</GradientPickerContext.Provider>;
};

/* -------------------------------------------------------------------------------------------------
 * Pointer helpers
 * ----------------------------------------------------------------------------------------------- */

/** Position of a pointer event inside `ref`, as percentages of its box. */
const getPointerPercent = (event: PointerEvent, ref: RefObject<HTMLElement | null>) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect || rect.width === 0 || rect.height === 0) return null;

    return {
        x: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
        y: clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100),
    };
};

/** Arrow/Home/End/PageUp/PageDown handling shared by the angle and stop handles. */
const getKeyboardStep = (event: KeyboardEvent) => {
    const large = event.shiftKey || event.key === "PageUp" || event.key === "PageDown";
    const step = large ? 10 : 1;

    switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
        case "PageUp":
            return step;
        case "ArrowLeft":
        case "ArrowDown":
        case "PageDown":
            return -step;
        default:
            return 0;
    }
};

/* -------------------------------------------------------------------------------------------------
 * Area
 * ----------------------------------------------------------------------------------------------- */

export interface GradientPickerAreaProps {
    /**
     * Accessible name for the group wrapping the two angle handles.
     * @default "Gradient direction"
     */
    label?: string;
    className?: string;
}

const GradientPickerArea = ({ label = "Gradient direction", className }: GradientPickerAreaProps) => {
    const { css, angle, setAngle, stops } = useGradientPicker();
    const areaRef = useRef<HTMLDivElement>(null);
    const { start, end } = getGradientEndpoints(angle);

    const handles = [
        { key: "start", point: start, offset: 180, color: stops[0]?.color, name: "Gradient angle start" },
        { key: "end", point: end, offset: 0, color: stops[stops.length - 1]?.color, name: "Gradient angle end" },
    ] as const;

    return (
        <div role="group" aria-label={label} className={cx(styles.common.area, className)}>
            <div ref={areaRef} className={styles.common.areaSurface} style={{ background: css }} />

            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible">
                <line
                    x1={`${start.x}%`}
                    y1={`${start.y}%`}
                    x2={`${end.x}%`}
                    y2={`${end.y}%`}
                    stroke="rgba(255,255,255,0.5)"
                    strokeDasharray="3 5"
                    strokeLinecap="round"
                    strokeWidth={2}
                />
            </svg>

            {handles.map((handle) => (
                // React Aria has no 2D-angle primitive and its `Button` cannot take `role="slider"`,
                // so the handles are native buttons with the slider role, drag and keys wired by hand.
                <button
                    key={handle.key}
                    type="button"
                    role="slider"
                    aria-label={handle.name}
                    aria-valuemin={0}
                    aria-valuemax={360}
                    aria-valuenow={Math.round(normalizeAngle(angle + handle.offset))}
                    aria-valuetext={`${Math.round(normalizeAngle(angle + handle.offset))} degrees`}
                    className={cx(styles.common.thumb, "z-10")}
                    style={{ left: `${handle.point.x}%`, top: `${handle.point.y}%`, background: handle.color }}
                    onPointerDown={(event) => {
                        event.currentTarget.setPointerCapture(event.pointerId);
                    }}
                    onPointerMove={(event) => {
                        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

                        const point = getPointerPercent(event, areaRef);

                        if (point) setAngle(getAngleFromPoint(point.x, point.y) - handle.offset);
                    }}
                    onKeyDown={(event) => {
                        const step = getKeyboardStep(event);

                        if (step === 0) return;

                        event.preventDefault();
                        setAngle(angle + step);
                    }}
                />
            ))}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Slider
 * ----------------------------------------------------------------------------------------------- */

export interface GradientPickerSliderProps {
    /**
     * Accessible name for the stop track.
     * @default "Gradient stops"
     */
    label?: string;
    className?: string;
}

const GradientPickerSlider = ({ label = "Gradient stops", className }: GradientPickerSliderProps) => {
    const { stops, addStop, updateStop, removeStop, setSelectedStopId, selectedStopId } = useGradientPicker();
    const trackRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={trackRef}
            role="group"
            aria-label={label}
            className={cx(styles.common.track, className)}
            // The gradient bar always reads left-to-right regardless of the picker's angle.
            style={{ background: toGradientCSS(stops, { type: "linear", angle: 90 }) }}
            onPointerDown={(event) => {
                // Clicks that land on a thumb are handled by the thumb itself.
                if (event.target !== event.currentTarget) return;

                const point = getPointerPercent(event, trackRef);

                if (point) addStop(point.x);
            }}
        >
            {stops.map((stop) => (
                <button
                    key={stop.id}
                    type="button"
                    role="slider"
                    aria-label={`Gradient stop at ${Math.round(stop.position)}%`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(stop.position)}
                    className={cx(styles.common.thumb, "top-1/2", selectedStopId === stop.id && "outline-focus-ring outline-2 outline-offset-2")}
                    style={{ left: `${stop.position}%`, background: stop.color }}
                    onFocus={() => setSelectedStopId(stop.id)}
                    onPointerDown={(event) => {
                        event.currentTarget.setPointerCapture(event.pointerId);
                        setSelectedStopId(stop.id);
                    }}
                    onPointerMove={(event) => {
                        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

                        const point = getPointerPercent(event, trackRef);

                        if (point) updateStop(stop.id, { position: Math.round(point.x) });
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Delete" || event.key === "Backspace") {
                            event.preventDefault();
                            removeStop(stop.id);
                            return;
                        }

                        const step = getKeyboardStep(event);

                        if (step === 0) return;

                        event.preventDefault();
                        updateStop(stop.id, { position: clamp(stop.position + step, 0, 100) });
                    }}
                />
            ))}
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Type select and reverse
 * ----------------------------------------------------------------------------------------------- */

export interface GradientPickerTypeSelectProps {
    /**
     * Accessible name for the trigger.
     * @default "Gradient type"
     */
    label?: string;
    className?: string;
}

const GradientPickerTypeSelect = ({ label = "Gradient type", className }: GradientPickerTypeSelectProps) => {
    const { type, setType } = useGradientPicker();

    return (
        <Dropdown.Root>
            <Button
                size="xs"
                color="link-gray"
                aria-label={label}
                className={className}
                iconTrailing={<ChevronDown data-icon className="size-3! stroke-[2.5px]!" />}
            >
                {TYPE_LABELS[type]}
            </Button>

            <Dropdown.Popover placement="bottom start" className="w-40">
                <Dropdown.Menu
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[type]}
                    onSelectionChange={(keys) => {
                        const [next] = [...keys];

                        if (next) setType(next as GradientType);
                    }}
                >
                    {TYPE_ITEMS.map((item) => (
                        <Dropdown.Item key={item.id} id={item.id} label={item.label} />
                    ))}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

export interface GradientPickerReverseProps {
    /**
     * Accessible name for the icon-only button.
     * @default "Reverse gradient"
     */
    label?: string;
    className?: string;
}

const GradientPickerReverse = ({ label = "Reverse gradient", className }: GradientPickerReverseProps) => {
    const { reverse } = useGradientPicker();

    return <ButtonUtility size="sm" color="tertiary" aria-label={label} icon={SwitchHorizontal01} onPress={reverse} className={className} />;
};

/* -------------------------------------------------------------------------------------------------
 * Stop list
 * ----------------------------------------------------------------------------------------------- */

/** Percentage box for one stop. Edits are held as text so "1" can be typed before "10". */
const GradientStopPositionField = ({ stop, index }: { stop: GradientStop; index: number }) => {
    const { updateStop } = useGradientPicker();
    const [draft, setDraft] = useState<string | null>(null);

    const commit = () => {
        if (draft === null) return;

        const parsed = Number.parseFloat(draft.replace("%", ""));

        if (!Number.isNaN(parsed)) updateStop(stop.id, { position: clamp(Math.round(parsed), 0, 100) });

        setDraft(null);
    };

    return (
        <div className={cx(styles.common.fieldBox, "w-14 shrink-0 rounded-lg shadow-xs")}>
            <AriaTextField
                aria-label={`Stop ${index + 1} position`}
                value={draft ?? `${Math.round(stop.position)}%`}
                onChange={setDraft}
                onBlur={commit}
                className="w-full"
            >
                <AriaInput
                    inputMode="numeric"
                    className={cx(styles.common.fieldInput, "px-2.5 py-2")}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") commit();
                        if (event.key === "Escape") setDraft(null);
                    }}
                />
            </AriaTextField>
        </div>
    );
};

const GradientStopRow = ({ stop, index, isRemovable }: { stop: GradientStop; index: number; isRemovable: boolean }) => {
    const { updateStop, removeStop } = useGradientPicker();

    return (
        <div className="flex items-center gap-3">
            <GradientStopPositionField stop={stop} index={index} />

            <div className="flex flex-1 items-center gap-1">
                <div className="flex flex-1 shadow-xs">
                    <div className={cx(styles.common.fieldBox, "flex-1 rounded-s-lg")}>
                        <AriaColorField
                            aria-label={`Stop ${index + 1} color`}
                            value={stop.color}
                            onChange={(color) => color && updateStop(stop.id, { color: color.toString("hexa") })}
                            className="flex flex-1 items-center gap-2 px-2.5 py-2"
                        >
                            <AriaColorSwatch color={stop.color} className={styles.common.fieldSwatch} />
                            <AriaInput className={styles.common.fieldInput} />
                        </AriaColorField>
                    </div>

                    <div className={cx(styles.common.fieldBox, "-ms-px w-14 shrink-0 rounded-e-lg")}>
                        <AriaColorField
                            channel="alpha"
                            aria-label={`Stop ${index + 1} alpha`}
                            value={stop.color}
                            onChange={(color) => color && updateStop(stop.id, { color: color.toString("hexa") })}
                            className="flex w-full items-center"
                        >
                            <AriaInput className={cx(styles.common.fieldInput, "px-2.5 py-2")} />
                        </AriaColorField>
                    </div>
                </div>

                <ButtonUtility
                    size="xs"
                    color="tertiary"
                    aria-label={`Remove stop ${index + 1}`}
                    icon={Minus}
                    isDisabled={!isRemovable}
                    onPress={() => removeStop(stop.id)}
                />
            </div>
        </div>
    );
};

export interface GradientPickerStopListProps {
    /**
     * Section title shown above the rows.
     * @default "Stops"
     */
    title?: ReactNode;
    className?: string;
}

const GradientPickerStopList = ({ title = "Stops", className }: GradientPickerStopListProps) => {
    const { stops, addStop } = useGradientPicker();
    const isRemovable = stops.length > MIN_STOPS;

    return (
        <div className={cx("flex flex-col gap-3", className)}>
            <div className={styles.common.sectionHeader}>
                <p className={styles.common.sectionTitle}>{title}</p>
                <Button size="xs" color="link-gray" iconLeading={Plus} onPress={() => addStop()}>
                    Add
                </Button>
            </div>

            <div className="flex flex-col gap-3">
                {stops.map((stop, index) => (
                    <GradientStopRow key={stop.id} stop={stop} index={index} isRemovable={isRemovable} />
                ))}
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Saved gradients
 * ----------------------------------------------------------------------------------------------- */

export interface GradientPickerSavedGradientsProps {
    /** The presets rendered as round swatches. */
    gradients: GradientPreset[];
    /**
     * Section title shown above the swatches.
     * @default "Saved"
     */
    title?: ReactNode;
    /** Called with the preset the user picked, after it has been applied to the picker. */
    onSelect?: (preset: GradientPreset) => void;
    /** When provided, renders an "Add" button that reports the gradient currently in the picker. */
    onAdd?: (preset: GradientPreset) => void;
    className?: string;
}

const GradientPickerSavedGradients = ({ gradients, title = "Saved", onSelect, onAdd, className }: GradientPickerSavedGradientsProps) => {
    const { stops, type, angle, applyPreset } = useGradientPicker();

    return (
        <div className={cx("flex flex-col gap-3", className)}>
            <div className={styles.common.sectionHeader}>
                <p className={styles.common.sectionTitle}>{title}</p>

                {onAdd && (
                    <Button
                        size="xs"
                        color="link-gray"
                        iconLeading={Plus}
                        onPress={() =>
                            onAdd({
                                id: `gradient-${gradients.length}`,
                                type,
                                angle,
                                stops: stops.map(({ color, position }) => ({ color, position })),
                            })
                        }
                    >
                        Add
                    </Button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {gradients.map((preset, index) => (
                    <AriaButton
                        key={preset.id}
                        aria-label={`Select gradient ${index + 1}`}
                        className={styles.common.presetSwatch}
                        style={{ background: toGradientCSS(preset.stops, { type: preset.type, angle: preset.angle }) }}
                        onPress={() => {
                            applyPreset(preset);
                            onSelect?.(preset);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------------------------------
 * Compound export
 * ----------------------------------------------------------------------------------------------- */

export const GradientPicker = {
    Provider: GradientPickerProvider,
    Area: GradientPickerArea,
    Slider: GradientPickerSlider,
    TypeSelect: GradientPickerTypeSelect,
    Reverse: GradientPickerReverse,
    StopList: GradientPickerStopList,
    SavedGradients: GradientPickerSavedGradients,
};
