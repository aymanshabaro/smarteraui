"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ColorPicker } from "../color-picker/color-picker";
import { GradientPicker as GradientPickerRoot } from "./gradient-picker";
import { DEFAULT_GRADIENT_STOPS, SAVED_GRADIENTS } from "./gradient-picker-gradients";
import type { GradientPreset } from "./gradient-picker-utils";

/** Centres a floating card the way the reference previews do. */
const DemoStage = ({ children }: { children: ReactNode }) => <div className="flex items-center justify-center p-4">{children}</div>;

/** Saved gradient row that grows as the user presses "Add". */
const SavedGradientsWithAdd = () => {
    const [gradients, setGradients] = useState<GradientPreset[]>(SAVED_GRADIENTS);

    return <GradientPickerRoot.SavedGradients gradients={gradients} onAdd={(preset) => setGradients((current) => [...current, preset])} />;
};

/** The full gradient picker card, shared by both example rows. */
const GradientPickerCard = () => (
    <GradientPickerRoot.Provider defaultStops={DEFAULT_GRADIENT_STOPS} defaultAngle={135}>
        <ColorPicker.Panel className="w-80">
            <div className="flex w-full flex-col gap-4 p-5">
                <div className="flex flex-col gap-4">
                    <GradientPickerRoot.Area />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <GradientPickerRoot.TypeSelect />
                            <GradientPickerRoot.Reverse />
                        </div>

                        <GradientPickerRoot.Slider />
                    </div>
                </div>

                <GradientPickerRoot.StopList />

                <SavedGradientsWithAdd />
            </div>
        </ColorPicker.Panel>
    </GradientPickerRoot.Provider>
);

export const GradientPickerExample = () => (
    <DemoStage>
        <GradientPickerCard />
    </DemoStage>
);

export const GradientPicker = () => (
    <DemoStage>
        <GradientPickerCard />
    </DemoStage>
);
