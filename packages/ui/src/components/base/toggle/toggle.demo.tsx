"use client";

import { Toggle } from "./toggle";

export const ToggleExample = () => <Toggle size="sm" label="Remember me" hint="Save my login details for next time." />;

export const Base = () => <Toggle size="sm" aria-label="Remember me" />;

export const WithLabel = () => <Toggle size="sm" label="Remember me" />;

export const WithLabelAndHint = () => <Toggle size="sm" label="Remember me" hint="Save my login details for next time." />;

export const Disabled = () => <Toggle size="sm" isDisabled label="Remember me" hint="Save my login details for next time." />;

export const Sizes = () => (
    <div className="flex flex-col gap-8">
        <Toggle size="sm" label="Remember me" hint="Save my login details for next time." />
        <Toggle size="md" label="Remember me" hint="Save my login details for next time." />
    </div>
);

export const Slim = () => <Toggle slim size="sm" aria-label="Remember me" />;

export const SlimWithLabelAndHint = () => <Toggle slim size="sm" label="Remember me" hint="Save my login details for next time." />;
