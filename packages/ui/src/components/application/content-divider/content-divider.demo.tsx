"use client";

import type { HTMLAttributes } from "react";
import { ArrowLeft, ArrowRight, Plus } from "@properui/icons";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { ContentDivider, type ContentDividerProps } from "./content-divider";

/** Decorative placeholder standing in for real page content between dividers. Demo-only, not exported. */
const PlaceholderBlock = ({ flip = false, filled = true, ...props }: HTMLAttributes<HTMLDivElement> & { flip?: boolean; filled?: boolean }) => (
    <div
        {...props}
        aria-hidden="true"
        className={cx(
            "border-secondary mx-auto h-24 w-full shrink-0 rounded-lg border opacity-50",
            filled && "bg-secondary",
            flip
                ? "bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,var(--color-border-secondary)_8px,var(--color-border-secondary)_9px)]"
                : "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,var(--color-border-secondary)_8px,var(--color-border-secondary)_9px)]",
        )}
    />
);

/** Shared row content reused by the single-line, dual-line, and background-fill demos. Demo-only, not exported. */
const ContentDividerRows = ({ type }: { type: ContentDividerProps["type"] }) => {
    const filled = type !== "background-fill";

    return (
        <div className="flex w-full flex-col gap-8">
            <PlaceholderBlock filled={filled} />

            <ContentDivider type={type}>
                <span className="text-md text-primary font-semibold">Notifications</span>
            </ContentDivider>

            <PlaceholderBlock filled={filled} flip />

            <ContentDivider type={type}>
                <span className="text-tertiary text-sm font-medium">Today</span>
            </ContentDivider>

            <PlaceholderBlock filled={filled} />

            <ContentDivider type={type}>
                <Button size="sm" color="secondary">
                    Add
                </Button>
            </ContentDivider>

            <PlaceholderBlock filled={filled} flip />

            <ContentDivider type={type}>
                <ButtonGroup aria-label="Navigate" size="sm" selectedKeys={[]}>
                    <ButtonGroupItem id="previous" aria-label="Previous" iconLeading={ArrowLeft} />
                    <ButtonGroupItem id="add" aria-label="Add" iconLeading={Plus} />
                    <ButtonGroupItem id="next" aria-label="Next" iconLeading={ArrowRight} />
                </ButtonGroup>
            </ContentDivider>

            <PlaceholderBlock filled={filled} />

            <ContentDivider type={type}>
                <ButtonGroup aria-label="Filter notifications" size="sm" defaultSelectedKeys={["view-all"]}>
                    <ButtonGroupItem id="view-all">View all</ButtonGroupItem>
                    <ButtonGroupItem id="active">Active</ButtonGroupItem>
                    <ButtonGroupItem id="inactive">Inactive</ButtonGroupItem>
                </ButtonGroup>
            </ContentDivider>

            <PlaceholderBlock filled={filled} flip />

            <ContentDivider type={type}>
                <Button size="md" color="secondary" iconLeading={Plus} aria-label="Add" />
            </ContentDivider>

            <PlaceholderBlock filled={filled} />
        </div>
    );
};

export const ContentDividerExample = () => (
    <div className="w-full max-w-xl">
        <ContentDivider type="single-line">
            <span className="text-md text-primary font-semibold">Notifications</span>
        </ContentDivider>
    </div>
);

export const SingleLine = () => <ContentDividerRows type="single-line" />;

export const DualLine = () => <ContentDividerRows type="dual-line" />;

export const BackgroundFill = () => <ContentDividerRows type="background-fill" />;
