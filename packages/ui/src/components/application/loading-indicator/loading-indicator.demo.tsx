"use client";

import { LoadingIndicator } from "./loading-indicator";

export const LoadingIndicatorExample = () => (
    <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
        <LoadingIndicator type="line-simple" size="md" label="Loading..." />
        <LoadingIndicator type="line-spinner" size="md" label="Loading..." />
        <LoadingIndicator type="dot-circle" size="md" label="Loading..." />
    </div>
);

export const LineSimple = () => <LoadingIndicator type="line-simple" size="md" />;

export const LineSimpleWithLabel = () => <LoadingIndicator type="line-simple" size="md" label="Loading..." />;

export const LineSpinner = () => <LoadingIndicator type="line-spinner" size="md" />;

export const LineSpinnerWithLabel = () => <LoadingIndicator type="line-spinner" size="md" label="Loading..." />;

export const DotCircle = () => <LoadingIndicator type="dot-circle" size="md" />;

export const DotCircleWithLabel = () => <LoadingIndicator type="dot-circle" size="md" label="Loading..." />;

export const Sizes = () => (
    <div className="flex flex-col items-start gap-8 md:flex-row">
        <LoadingIndicator type="line-simple" size="sm" label="Loading..." />
        <LoadingIndicator type="line-simple" size="md" label="Loading..." />
        <LoadingIndicator type="line-simple" size="lg" label="Loading..." />
        <LoadingIndicator type="line-simple" size="xl" label="Loading..." />
    </div>
);
