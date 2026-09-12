"use client";

import { Callout } from "./callout";

export const CalloutExample = () => (
    <Callout title="Heads up" className="w-full max-w-md">
        This project is on the free plan. Upgrade to invite more teammates.
    </Callout>
);

export const Tones = () => (
    <div className="flex w-full max-w-md flex-col gap-4">
        <Callout tone="neutral" title="Neutral">
            General information that is not tied to any particular state.
        </Callout>
        <Callout tone="brand" title="Brand">
            A tip or a piece of guidance worth calling out.
        </Callout>
        <Callout tone="success" title="Success">
            The export finished and is ready to download.
        </Callout>
        <Callout tone="warning" title="Warning">
            Your trial ends in three days. Add a payment method to keep access.
        </Callout>
        <Callout tone="error" title="Error">
            The last sync failed. Check your connection and try again.
        </Callout>
    </div>
);

export const WithoutTitle = () => <Callout className="w-full max-w-md">A callout works without a title too, for a single short line.</Callout>;

export const WithoutIcon = () => (
    <Callout icon={null} tone="brand" title="No icon" className="w-full max-w-md">
        Pass `icon={null}` to render the callout without one.
    </Callout>
);
