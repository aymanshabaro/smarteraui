import type { FC } from "react";
import { BackgroundPattern } from "./";

const patterns = ["grid", "grid-check", "square", "circle"] as const;

export default {
    title: "Foundations/Background Patterns",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full overflow-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export const BackgroundPatterns = () => (
    <div className="grid grid-cols-2 gap-8">
        {patterns.map((pattern) => (
            <div key={pattern} className="border-secondary relative flex h-64 items-center justify-center overflow-hidden rounded-lg border">
                <BackgroundPattern pattern={pattern} size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <span className="text-tertiary relative z-10 text-sm font-medium">{pattern}</span>
            </div>
        ))}
    </div>
);
