"use client";

import type { HTMLAttributes } from "react";
import { Check } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

/** Placeholder decorative icon used to demonstrate icon slots without implying a specific action. */
const Circle = (props: HTMLAttributes<HTMLSpanElement>) => <span {...props} className={cx("size-5 rounded-[50%] border-2 border-current", props.className)} />;

export const ButtonExample = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-center">
            <Button color="primary-destructive" size="md">
                Delete project
            </Button>
            <Button color="secondary" size="md">
                Stage for publish
            </Button>
            <Button color="primary" size="md" iconLeading={Check}>
                Publish now
            </Button>
        </div>
    );
};

export const PrimaryButtons = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button size="xs">Button xs</Button>
            <Button size="sm">Button sm</Button>
            <Button size="md">Button md</Button>
            <Button size="lg">Button lg</Button>
            <Button size="xl">Button xl</Button>
        </div>
    );
};

export const SecondaryButtons = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="secondary" size="xs">
                Button xs
            </Button>
            <Button color="secondary" size="sm">
                Button sm
            </Button>
            <Button color="secondary" size="md">
                Button md
            </Button>
            <Button color="secondary" size="lg">
                Button lg
            </Button>
            <Button color="secondary" size="xl">
                Button xl
            </Button>
        </div>
    );
};

export const TertiaryButtons = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="tertiary" size="xs">
                Button xs
            </Button>
            <Button color="tertiary" size="sm">
                Button sm
            </Button>
            <Button color="tertiary" size="md">
                Button md
            </Button>
            <Button color="tertiary" size="lg">
                Button lg
            </Button>
            <Button color="tertiary" size="xl">
                Button xl
            </Button>
        </div>
    );
};

export const LinkColorButtonsExample = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="link-color" size="xs">
                Button xs
            </Button>
            <Button color="link-color" size="sm">
                Button sm
            </Button>
            <Button color="link-color" size="md">
                Button md
            </Button>
            <Button color="link-color" size="lg">
                Button lg
            </Button>
            <Button color="link-color" size="xl">
                Button xl
            </Button>
        </div>
    );
};

export const LinkGrayButtons = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="link-gray" size="xs">
                Button xs
            </Button>
            <Button color="link-gray" size="sm">
                Button sm
            </Button>
            <Button color="link-gray" size="md">
                Button md
            </Button>
            <Button color="link-gray" size="lg">
                Button lg
            </Button>
            <Button color="link-gray" size="xl">
                Button xl
            </Button>
        </div>
    );
};

export const IconLeadingButtonsExample = () => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button size="xs" iconLeading={Circle}>
                    Button xs
                </Button>
                <Button size="sm" iconLeading={Circle}>
                    Button sm
                </Button>
                <Button size="md" iconLeading={Circle}>
                    Button md
                </Button>
                <Button size="lg" iconLeading={Circle}>
                    Button lg
                </Button>
                <Button size="xl" iconLeading={Circle}>
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="secondary" size="xs" iconLeading={Circle}>
                    Button xs
                </Button>
                <Button color="secondary" size="sm" iconLeading={Circle}>
                    Button sm
                </Button>
                <Button color="secondary" size="md" iconLeading={Circle}>
                    Button md
                </Button>
                <Button color="secondary" size="lg" iconLeading={Circle}>
                    Button lg
                </Button>
                <Button color="secondary" size="xl" iconLeading={Circle}>
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="tertiary" size="xs" iconLeading={Circle}>
                    Button xs
                </Button>
                <Button color="tertiary" size="sm" iconLeading={Circle}>
                    Button sm
                </Button>
                <Button color="tertiary" size="md" iconLeading={Circle}>
                    Button md
                </Button>
                <Button color="tertiary" size="lg" iconLeading={Circle}>
                    Button lg
                </Button>
                <Button color="tertiary" size="xl" iconLeading={Circle}>
                    Button xl
                </Button>
            </div>
        </div>
    );
};

export const IconTrailingButtonsExample = () => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button size="xs" iconTrailing={Circle}>
                    Button xs
                </Button>
                <Button size="sm" iconTrailing={Circle}>
                    Button sm
                </Button>
                <Button size="md" iconTrailing={Circle}>
                    Button md
                </Button>
                <Button size="lg" iconTrailing={Circle}>
                    Button lg
                </Button>
                <Button size="xl" iconTrailing={Circle}>
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="secondary" size="xs" iconTrailing={Circle}>
                    Button xs
                </Button>
                <Button color="secondary" size="sm" iconTrailing={Circle}>
                    Button sm
                </Button>
                <Button color="secondary" size="md" iconTrailing={Circle}>
                    Button md
                </Button>
                <Button color="secondary" size="lg" iconTrailing={Circle}>
                    Button lg
                </Button>
                <Button color="secondary" size="xl" iconTrailing={Circle}>
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="tertiary" size="xs" iconTrailing={Circle}>
                    Button xs
                </Button>
                <Button color="tertiary" size="sm" iconTrailing={Circle}>
                    Button sm
                </Button>
                <Button color="tertiary" size="md" iconTrailing={Circle}>
                    Button md
                </Button>
                <Button color="tertiary" size="lg" iconTrailing={Circle}>
                    Button lg
                </Button>
                <Button color="tertiary" size="xl" iconTrailing={Circle}>
                    Button xl
                </Button>
            </div>
        </div>
    );
};

export const IconOnlyButtonsExample = () => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
                <Button size="xs" iconLeading={Circle} aria-label="Action" />
                <Button size="sm" iconLeading={Circle} aria-label="Action" />
                <Button size="md" iconLeading={Circle} aria-label="Action" />
                <Button size="lg" iconLeading={Circle} aria-label="Action" />
                <Button size="xl" iconLeading={Circle} aria-label="Action" />
            </div>
            <div className="flex items-center gap-3">
                <Button color="secondary" size="xs" iconLeading={Circle} aria-label="Action" />
                <Button color="secondary" size="sm" iconLeading={Circle} aria-label="Action" />
                <Button color="secondary" size="md" iconLeading={Circle} aria-label="Action" />
                <Button color="secondary" size="lg" iconLeading={Circle} aria-label="Action" />
                <Button color="secondary" size="xl" iconLeading={Circle} aria-label="Action" />
            </div>
            <div className="flex items-center gap-3">
                <Button color="tertiary" size="xs" iconLeading={Circle} aria-label="Action" />
                <Button color="tertiary" size="sm" iconLeading={Circle} aria-label="Action" />
                <Button color="tertiary" size="md" iconLeading={Circle} aria-label="Action" />
                <Button color="tertiary" size="lg" iconLeading={Circle} aria-label="Action" />
                <Button color="tertiary" size="xl" iconLeading={Circle} aria-label="Action" />
            </div>
        </div>
    );
};

export const LoadingButtonsExample = () => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button isLoading showTextWhileLoading size="xs">
                    Button xs
                </Button>
                <Button isLoading showTextWhileLoading size="sm">
                    Button sm
                </Button>
                <Button isLoading showTextWhileLoading size="md">
                    Button md
                </Button>
                <Button isLoading showTextWhileLoading size="lg">
                    Button lg
                </Button>
                <Button isLoading showTextWhileLoading size="xl">
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="secondary" isLoading showTextWhileLoading size="xs">
                    Button xs
                </Button>
                <Button color="secondary" isLoading showTextWhileLoading size="sm">
                    Button sm
                </Button>
                <Button color="secondary" isLoading showTextWhileLoading size="md">
                    Button md
                </Button>
                <Button color="secondary" isLoading showTextWhileLoading size="lg">
                    Button lg
                </Button>
                <Button color="secondary" isLoading showTextWhileLoading size="xl">
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="tertiary" isLoading showTextWhileLoading size="xs">
                    Button xs
                </Button>
                <Button color="tertiary" isLoading showTextWhileLoading size="sm">
                    Button sm
                </Button>
                <Button color="tertiary" isLoading showTextWhileLoading size="md">
                    Button md
                </Button>
                <Button color="tertiary" isLoading showTextWhileLoading size="lg">
                    Button lg
                </Button>
                <Button color="tertiary" isLoading showTextWhileLoading size="xl">
                    Button xl
                </Button>
            </div>
        </div>
    );
};

export const DisabledButtonsExample = () => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button isDisabled size="xs">
                    Button xs
                </Button>
                <Button isDisabled size="sm">
                    Button sm
                </Button>
                <Button isDisabled size="md">
                    Button md
                </Button>
                <Button isDisabled size="lg">
                    Button lg
                </Button>
                <Button isDisabled size="xl">
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="secondary" isDisabled size="xs">
                    Button xs
                </Button>
                <Button color="secondary" isDisabled size="sm">
                    Button sm
                </Button>
                <Button color="secondary" isDisabled size="md">
                    Button md
                </Button>
                <Button color="secondary" isDisabled size="lg">
                    Button lg
                </Button>
                <Button color="secondary" isDisabled size="xl">
                    Button xl
                </Button>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <Button color="tertiary" isDisabled size="xs">
                    Button xs
                </Button>
                <Button color="tertiary" isDisabled size="sm">
                    Button sm
                </Button>
                <Button color="tertiary" isDisabled size="md">
                    Button md
                </Button>
                <Button color="tertiary" isDisabled size="lg">
                    Button lg
                </Button>
                <Button color="tertiary" isDisabled size="xl">
                    Button xl
                </Button>
            </div>
        </div>
    );
};

export const PrimaryButtonsDestructiveExample = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="primary-destructive" size="xs">
                Button xs
            </Button>
            <Button color="primary-destructive" size="sm">
                Button sm
            </Button>
            <Button color="primary-destructive" size="md">
                Button md
            </Button>
            <Button color="primary-destructive" size="lg">
                Button lg
            </Button>
            <Button color="primary-destructive" size="xl">
                Button xl
            </Button>
        </div>
    );
};

export const SecondaryButtonsDestructive = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="secondary-destructive" size="xs">
                Button xs
            </Button>
            <Button color="secondary-destructive" size="sm">
                Button sm
            </Button>
            <Button color="secondary-destructive" size="md">
                Button md
            </Button>
            <Button color="secondary-destructive" size="lg">
                Button lg
            </Button>
            <Button color="secondary-destructive" size="xl">
                Button xl
            </Button>
        </div>
    );
};

export const TertiaryButtonsDestructive = () => {
    return (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Button color="tertiary-destructive" size="xs">
                Button xs
            </Button>
            <Button color="tertiary-destructive" size="sm">
                Button sm
            </Button>
            <Button color="tertiary-destructive" size="md">
                Button md
            </Button>
            <Button color="tertiary-destructive" size="lg">
                Button lg
            </Button>
            <Button color="tertiary-destructive" size="xl">
                Button xl
            </Button>
        </div>
    );
};
