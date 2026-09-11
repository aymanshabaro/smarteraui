"use client";

import { CheckCircle } from "@properui/icons";
import { FeaturedIcon } from "./featured-icon";

export const FeaturedIconExample = () => {
    return (
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
            <FeaturedIcon color="brand" icon={CheckCircle} theme="light" size="lg" />
            <FeaturedIcon color="brand" icon={CheckCircle} theme="gradient" size="lg" />
            <FeaturedIcon color="brand" icon={CheckCircle} theme="dark" size="lg" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="lg" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="lg" />
            <FeaturedIcon color="brand" icon={CheckCircle} theme="outline" size="lg" />
        </div>
    );
};

export const Light = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-4">
                    <FeaturedIcon color={color} icon={CheckCircle} theme="light" size="sm" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="light" size="md" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="light" size="lg" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="light" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const Gradient = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-4">
                    <FeaturedIcon color={color} icon={CheckCircle} theme="gradient" size="sm" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="gradient" size="md" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="gradient" size="lg" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="gradient" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const Dark = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-4">
                    <FeaturedIcon color={color} icon={CheckCircle} theme="dark" size="sm" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="dark" size="md" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="dark" size="lg" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="dark" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const Outline = () => {
    return (
        <div className="flex flex-col items-start gap-8">
            {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                <div key={color} className="flex gap-8">
                    <FeaturedIcon color={color} icon={CheckCircle} theme="outline" size="sm" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="outline" size="md" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="outline" size="lg" />
                    <FeaturedIcon color={color} icon={CheckCircle} theme="outline" size="xl" />
                </div>
            ))}
        </div>
    );
};

export const Modern = () => {
    return (
        <div className="flex items-start gap-4">
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="sm" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="md" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="lg" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern" size="xl" />
        </div>
    );
};

export const ModernNeue = () => {
    return (
        <div className="flex items-start gap-4">
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="sm" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="md" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="lg" />
            <FeaturedIcon color="gray" icon={CheckCircle} theme="modern-neue" size="xl" />
        </div>
    );
};
