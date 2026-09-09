"use client";

import { Checkbox } from "@/components/base/checkbox/checkbox";

export const CheckboxExample = () => <Checkbox size="sm" label="Remember me" hint="Save my login details for next time." />;

export const Base = () => <Checkbox size="sm" aria-label="Remember me" />;

export const WithLabel = () => <Checkbox size="sm" label="Remember me" />;

export const WithLabelAndHint = () => <Checkbox size="sm" label="Remember me" hint="Save my login details for next time." />;

export const Disabled = () => <Checkbox size="sm" isDisabled label="Remember me" hint="Save my login details for next time." />;

export const Sizes = () => (
    <div className="flex flex-col gap-8">
        <Checkbox size="sm" label="Remember me" hint="Save my login details for next time." />
        <Checkbox size="md" label="Remember me" hint="Save my login details for next time." />
    </div>
);
