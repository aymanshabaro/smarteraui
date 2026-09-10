"use client";

import { useState } from "react";
import type { FC, HTMLAttributes, ReactNode, SVGProps } from "react";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    FileTrigger as AriaFileTrigger,
    Group as AriaGroup,
    Input as AriaInput,
    ListBox as AriaListBox,
    ListBoxItem as AriaListBoxItem,
    Popover as AriaPopover,
    Select as AriaSelect,
    SelectValue as AriaSelectValue,
    Separator as AriaSeparator,
    TextField as AriaTextField,
    ToggleButton as AriaToggleButton,
    Toolbar as AriaToolbar,
} from "react-aria-components";
import { AlignCenter, AlignLeft, AlignRight, Bold01, ChevronDown, Dotpoints01, Image01, Italic01, Link01, Stars02, Type01, Underline01 } from "@properui/icons";
import { cx } from "@/utils/cx";
import { fontFamilies, fontSizes, textColors } from "./text-editor-commands";
import type { TextEditorCommand, TrackedTextEditorCommand } from "./text-editor-commands";
import { useTextEditorContext } from "./text-editor-context";
import { styles } from "./text-editor-styles";

type IconComponent = FC<SVGProps<SVGSVGElement>>;

interface ToolbarItemProps {
    /** Additional classes merged onto the toolbar button. */
    className?: string;
    /** Whether the item is disabled. */
    isDisabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  Containers                                */
/* -------------------------------------------------------------------------- */

export interface TextEditorToolbarProps extends ToolbarItemProps {
    /** Renders the toolbar as an elevated floating bar above the editable area. */
    isFloating?: boolean;
    /** Accessible name for the toolbar. */
    "aria-label"?: string;
    children: ReactNode;
}

/** Row of toolbar groups shown above the editable area. */
export const TextEditorToolbar = ({ isFloating, className, children, "aria-label": ariaLabel = "Text formatting" }: TextEditorToolbarProps) => {
    const { size } = useTextEditorContext();

    return (
        <AriaToolbar
            aria-label={ariaLabel}
            className={cx(
                styles.common.toolbar,
                styles.sizes[size].toolbar,
                isFloating && styles.common.toolbarFloating,
                isFloating && styles.sizes[size].toolbarFloating,
                className,
            )}
        >
            {children}
        </AriaToolbar>
    );
};

export interface TextEditorGroupProps extends ToolbarItemProps {
    /** Accessible name for the group of controls. */
    "aria-label"?: string;
    children: ReactNode;
}

/** Groups related toolbar controls; wraps on narrow viewports. */
export const TextEditorGroup = ({ className, children, "aria-label": ariaLabel }: TextEditorGroupProps) => (
    <AriaGroup aria-label={ariaLabel} className={cx(styles.common.group, className)}>
        {children}
    </AriaGroup>
);

/** Vertical rule between toolbar groups. */
export const TextEditorSeparator = ({ className }: { className?: string }) => (
    <div className={cx(styles.common.separator, className)} aria-hidden="true">
        <AriaSeparator elementType="div" orientation="vertical" className={styles.common.separatorLine} />
    </div>
);

/* -------------------------------------------------------------------------- */
/*                              Formatting toggles                            */
/* -------------------------------------------------------------------------- */

interface FormatToggleProps extends ToolbarItemProps {
    command: TrackedTextEditorCommand;
    icon: IconComponent;
    label: string;
    shortcut?: string;
}

const FormatToggle = ({ command, icon: Icon, label, shortcut, className, isDisabled }: FormatToggleProps) => {
    const { activeCommands, runCommand } = useTextEditorContext();

    return (
        <AriaToggleButton
            aria-label={shortcut ? `${label} ${shortcut}` : label}
            isDisabled={isDisabled}
            isSelected={activeCommands[command]}
            onChange={() => runCommand(command)}
            // Keeps the document selection while the toolbar button takes the press.
            onPointerDown={(event) => event.preventDefault()}
            className={cx(styles.common.button, className)}
        >
            <Icon aria-hidden="true" className={styles.common.buttonIcon} />
        </AriaToggleButton>
    );
};

/** Toggles bold on the current selection. */
export const TextEditorBold = (props: ToolbarItemProps) => <FormatToggle {...props} command="bold" icon={Bold01} label="Bold" shortcut="⌘B" />;

/** Toggles italic on the current selection. */
export const TextEditorItalic = (props: ToolbarItemProps) => <FormatToggle {...props} command="italic" icon={Italic01} label="Italic" shortcut="⌘I" />;

/** Toggles underline on the current selection. */
export const TextEditorUnderline = (props: ToolbarItemProps) => (
    <FormatToggle {...props} command="underline" icon={Underline01} label="Underline" shortcut="⌘U" />
);

/** Left-aligns the current block. */
export const TextEditorAlignLeft = (props: ToolbarItemProps) => <FormatToggle {...props} command="justifyLeft" icon={AlignLeft} label="Left align" />;

/** Centres the current block. */
export const TextEditorAlignCenter = (props: ToolbarItemProps) => <FormatToggle {...props} command="justifyCenter" icon={AlignCenter} label="Center align" />;

/** Right-aligns the current block. */
export const TextEditorAlignRight = (props: ToolbarItemProps) => <FormatToggle {...props} command="justifyRight" icon={AlignRight} label="Right align" />;

/** Turns the current block into a bulleted list. */
export const TextEditorBulletList = (props: ToolbarItemProps) => (
    <FormatToggle {...props} command="insertUnorderedList" icon={Dotpoints01} label="Bullet list" />
);

/* -------------------------------------------------------------------------- */
/*                                 Text colour                                */
/* -------------------------------------------------------------------------- */

/** Opens a swatch picker that recolours the current selection. */
export const TextEditorTextColor = ({ className, isDisabled }: ToolbarItemProps) => {
    const { textColor, setTextColor, saveSelection } = useTextEditorContext();

    return (
        <AriaDialogTrigger>
            <AriaButton
                aria-label="Text color"
                isDisabled={isDisabled}
                onPress={saveSelection}
                onPointerDown={(event) => event.preventDefault()}
                className={cx(styles.common.button, className)}
            >
                <span aria-hidden="true" className={styles.common.swatch} style={{ backgroundColor: textColor, outlineColor: textColor }} />
            </AriaButton>

            <AriaPopover offset={8} className={styles.common.popover}>
                <AriaDialog aria-label="Text color" className="outline-hidden">
                    {({ close }) => (
                        <div className={styles.common.colorGrid}>
                            {textColors.map((color) => (
                                <AriaButton
                                    key={color.id}
                                    aria-label={color.name}
                                    onPress={() => {
                                        setTextColor(color.value);
                                        close();
                                    }}
                                    className={styles.common.colorOption}
                                >
                                    <span aria-hidden="true" className={styles.common.colorOptionSwatch} style={{ backgroundColor: color.value }} />
                                </AriaButton>
                            ))}
                        </div>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};

/* -------------------------------------------------------------------------- */
/*                                    Link                                    */
/* -------------------------------------------------------------------------- */

/** Opens a popover that wraps the current selection in a link. */
export const TextEditorLink = ({ className, isDisabled }: ToolbarItemProps) => {
    const { runCommand, saveSelection } = useTextEditorContext();
    const [href, setHref] = useState("");

    return (
        <AriaDialogTrigger>
            <AriaButton
                aria-label="Link ⌘K"
                isDisabled={isDisabled}
                onPress={saveSelection}
                onPointerDown={(event) => event.preventDefault()}
                className={cx(styles.common.button, className)}
            >
                <Link01 aria-hidden="true" className={styles.common.buttonIcon} />
            </AriaButton>

            <AriaPopover offset={8} className={styles.common.popover}>
                <AriaDialog aria-label="Add link" className="outline-hidden">
                    {({ close }) => (
                        <form
                            className={styles.common.linkForm}
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (href) runCommand("createLink", href);
                                setHref("");
                                close();
                            }}
                        >
                            <AriaTextField aria-label="Link URL" value={href} onChange={setHref} className="w-full">
                                <AriaInput placeholder="https://" className={styles.common.linkInput} />
                            </AriaTextField>
                            <AriaButton type="submit" className={styles.common.linkSubmit}>
                                Apply
                            </AriaButton>
                        </form>
                    )}
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};

/* -------------------------------------------------------------------------- */
/*                              Image and generate                            */
/* -------------------------------------------------------------------------- */

export interface TextEditorImageProps extends ToolbarItemProps {
    /** Called with the picked files. Overrides the default "insert the first image" behaviour. */
    onSelect?: (files: FileList | null) => void;
}

/** Picks an image from the file system and inserts it at the caret. */
export const TextEditorImage = ({ className, isDisabled, onSelect }: TextEditorImageProps) => {
    const { runCommand } = useTextEditorContext();

    const handleSelect = (files: FileList | null) => {
        if (onSelect) {
            onSelect(files);
            return;
        }

        const file = files?.[0];
        if (!file || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") return;

        runCommand("insertImage", URL.createObjectURL(file));
    };

    return (
        <AriaFileTrigger acceptedFileTypes={["image/*"]} onSelect={handleSelect}>
            <AriaButton aria-label="Insert image" isDisabled={isDisabled} className={cx(styles.common.button, className)}>
                <Image01 aria-hidden="true" className={styles.common.buttonIcon} />
            </AriaButton>
        </AriaFileTrigger>
    );
};

export interface TextEditorGenerateProps extends ToolbarItemProps {
    /** Called when the generate action is triggered. */
    onPress?: () => void;
    /** Accessible name for the action. */
    label?: string;
}

/** Hook for an assistive "generate" action; wire it up with `onPress`. */
export const TextEditorGenerate = ({ className, isDisabled, onPress, label = "Generate" }: TextEditorGenerateProps) => (
    <AriaButton aria-label={label} isDisabled={isDisabled} onPress={onPress} className={cx(styles.common.button, className)}>
        <Stars02 aria-hidden="true" className={styles.common.buttonIcon} />
    </AriaButton>
);

/* -------------------------------------------------------------------------- */
/*                                   Selects                                  */
/* -------------------------------------------------------------------------- */

interface ToolbarSelectProps {
    label: string;
    items: readonly { id: string; label: string }[];
    selectedKey: string;
    onSelectionChange: (key: string) => void;
    icon?: IconComponent;
    className?: string;
    isDisabled?: boolean;
}

const ToolbarSelect = ({ label, items, selectedKey, onSelectionChange, icon: Icon, className, isDisabled }: ToolbarSelectProps) => (
    <AriaSelect
        aria-label={label}
        isDisabled={isDisabled}
        selectedKey={selectedKey}
        onSelectionChange={(key) => onSelectionChange(String(key))}
        className={cx(styles.common.selectRoot, className)}
    >
        <AriaButton className={styles.common.selectButton}>
            {Icon && <Icon aria-hidden="true" data-icon="leading" className={styles.common.selectIcon} />}
            <AriaSelectValue className={styles.common.selectValue} />
            <ChevronDown aria-hidden="true" className={cx(styles.common.selectIcon, "ms-auto")} />
        </AriaButton>

        <AriaPopover offset={4} className={styles.common.popover}>
            <AriaListBox className={styles.common.selectList}>
                {items.map((item) => (
                    <AriaListBoxItem key={item.id} id={item.id} textValue={item.label} className={styles.common.selectItem}>
                        {item.label}
                    </AriaListBoxItem>
                ))}
            </AriaListBox>
        </AriaPopover>
    </AriaSelect>
);

/** Selects the editor's font family. */
export const TextEditorFontFamily = ({ className, isDisabled }: ToolbarItemProps) => {
    const { fontFamily, setFontFamily } = useTextEditorContext();

    return (
        <ToolbarSelect
            label="Font family"
            icon={Type01}
            items={fontFamilies}
            selectedKey={fontFamily}
            onSelectionChange={setFontFamily}
            isDisabled={isDisabled}
            className={cx("w-full md:w-38", className)}
        />
    );
};

/** Selects the editor's base font size. */
export const TextEditorFontSize = ({ className, isDisabled }: ToolbarItemProps) => {
    const { fontSize, setFontSize } = useTextEditorContext();

    return (
        <ToolbarSelect
            label="Font size"
            items={fontSizes.map((value) => ({ id: value, label: value }))}
            selectedKey={fontSize}
            onSelectionChange={setFontSize}
            isDisabled={isDisabled}
            className={cx("w-full md:w-22", className)}
        />
    );
};

/* -------------------------------------------------------------------------- */
/*                             Selection toolbar                              */
/* -------------------------------------------------------------------------- */

export interface TextEditorSelectionToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Accessible name for the toolbar. */
    "aria-label"?: string;
    children: ReactNode;
}

/**
 * Floating toolbar anchored to the current text selection. It is removed from the
 * DOM while nothing is selected, so it never traps focus or clutters the a11y tree.
 */
export const TextEditorSelectionToolbar = ({
    className,
    style,
    children,
    "aria-label": ariaLabel = "Selection formatting",
    ...props
}: TextEditorSelectionToolbarProps) => {
    const { size, selectionRect } = useTextEditorContext();

    if (!selectionRect) return null;

    return (
        <div
            {...props}
            style={{ top: selectionRect.top, left: selectionRect.left, ...style }}
            className={cx(styles.common.selectionToolbar, styles.common.toolbarFloating, styles.sizes[size].toolbarFloating, className)}
        >
            <AriaToolbar aria-label={ariaLabel} className={styles.common.group}>
                {children}
            </AriaToolbar>
        </div>
    );
};

/** Command union re-exported for consumers building custom toolbar items. */
export type { TextEditorCommand };
