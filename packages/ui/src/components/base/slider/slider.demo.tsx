"use client";

import { Slider } from "./slider";

export const SliderExample = () => {
    return (
        <div className="w-full max-w-md">
            <Slider aria-label="Price range" defaultValue={[0, 25]} />
        </div>
    );
};

export const Default = () => {
    return (
        <div className="w-full max-w-md">
            <Slider aria-label="Price range" defaultValue={[0, 25]} />
        </div>
    );
};

export const BottomLabel = () => {
    return (
        <div className="w-full max-w-md">
            <Slider aria-label="Price range" defaultValue={[0, 25]} labelPosition="bottom" />
        </div>
    );
};

export const TopFloating = () => {
    return (
        <div className="w-full max-w-md">
            <Slider aria-label="Price range" defaultValue={[0, 25]} labelPosition="top-floating" />
        </div>
    );
};

export const SingleThumb = () => {
    return (
        <div className="w-full max-w-md">
            <Slider aria-label="Volume" defaultValue={50} labelPosition="top-floating" />
        </div>
    );
};
