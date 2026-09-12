"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronLeftDouble, ChevronRight, ChevronRightDouble } from "@properui/icons";
import { useBreakpoint } from "../../../hooks/use-breakpoint";
import { cx } from "../../../utils/cx";
import { ButtonGroup, ButtonGroupItem } from "../../base/button-group/button-group";
import { Button } from "../../base/buttons/button";
import { InputBase } from "../../base/input/input";
import { Select } from "../../base/select/select";
import type { PaginationRootProps } from "./pagination-base";
import { Pagination } from "./pagination-base";

/** Override props shared by every pagination variant, for localisation. */
interface PaginationLabelsProps {
    /** Text on the previous-page trigger. @default "Previous" */
    previousLabel?: string;
    /** Text on the next-page trigger. @default "Next" */
    nextLabel?: string;
    /** Formats the "Page X of Y" caption. @default (page, total) => `Page {page} of {total}` */
    pageLabel?: (page: number, total: number) => ReactNode;
}

const defaultPageLabel = (page: number, total: number): ReactNode => (
    <>
        Page <span className="font-medium">{page}</span> of <span className="font-medium">{total}</span>
    </>
);

interface PaginationProps extends Partial<Omit<PaginationRootProps, "children">>, PaginationLabelsProps {
    /** Whether the pagination buttons are rounded. */
    rounded?: boolean;
}

const PaginationItem = ({ value, rounded, isCurrent }: { value: number; rounded?: boolean; isCurrent: boolean }) => {
    return (
        <Pagination.Item
            value={value}
            isCurrent={isCurrent}
            className={({ isSelected }) =>
                cx(
                    "text-quaternary outline-focus-ring hover:bg-primary_hover hover:text-secondary focus-visible:bg-primary_hover flex size-9 cursor-pointer items-center justify-center p-3 text-sm font-medium transition duration-100 ease-linear focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                    rounded ? "rounded-full" : "rounded-lg",
                    isSelected && "bg-primary_hover text-secondary",
                )
            }
        >
            {value}
        </Pagination.Item>
    );
};

interface MobilePaginationProps extends PaginationLabelsProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
}

const MobilePagination = ({
    page = 1,
    total = 10,
    className,
    onPageChange,
    previousLabel = "Go to previous page",
    nextLabel = "Go to next page",
    pageLabel,
}: MobilePaginationProps) => {
    return (
        <div className={cx("flex items-center justify-between md:hidden", className)}>
            <Button aria-label={previousLabel} iconLeading={ArrowLeft} color="secondary" size="sm" onClick={() => onPageChange?.(Math.max(0, page - 1))} />

            <span className="text-fg-secondary text-sm">{(pageLabel ?? defaultPageLabel)(page, total)}</span>

            <Button aria-label={nextLabel} iconLeading={ArrowRight} color="secondary" size="sm" onClick={() => onPageChange?.(Math.min(total, page + 1))} />
        </div>
    );
};

export const PaginationPageDefault = ({
    rounded,
    page = 1,
    total = 10,
    className,
    previousLabel = "Previous",
    nextLabel = "Next",
    pageLabel,
    ...props
}: PaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className={cx("border-secondary flex w-full items-center justify-between gap-3 border-t pt-4 md:pt-5", className)}
        >
            <div className="hidden flex-1 justify-start md:flex">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="link-gray" size="sm">
                        {isDesktop ? previousLabel : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.PrevTrigger asChild className="md:hidden">
                <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                    {isDesktop ? previousLabel : undefined}
                </Button>
            </Pagination.PrevTrigger>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} rounded={rounded} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="text-tertiary flex size-9 shrink-0 items-center justify-center">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="text-fg-secondary flex justify-center text-sm whitespace-pre md:hidden">
                            {(pageLabel ?? defaultPageLabel)(currentPage, total)}
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="hidden flex-1 justify-end md:flex">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="link-gray" size="sm">
                        {isDesktop ? nextLabel : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
            <Pagination.NextTrigger asChild className="md:hidden">
                <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                    {isDesktop ? nextLabel : undefined}
                </Button>
            </Pagination.NextTrigger>
        </Pagination.Root>
    );
};

export const PaginationPageMinimalCenter = ({
    rounded,
    page = 1,
    total = 10,
    className,
    previousLabel = "Previous",
    nextLabel = "Next",
    pageLabel,
    ...props
}: PaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className={cx("border-secondary flex w-full items-center justify-between gap-3 border-t pt-4 md:pt-5", className)}
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? previousLabel : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} rounded={rounded} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="text-tertiary flex size-9 shrink-0 items-center justify-center">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="text-fg-secondary flex justify-center text-sm whitespace-pre md:hidden">
                            {(pageLabel ?? defaultPageLabel)(currentPage, total)}
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? nextLabel : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

export const PaginationCardDefault = ({
    rounded,
    page = 1,
    total = 10,
    previousLabel = "Previous",
    nextLabel = "Next",
    pageLabel,
    ...props
}: PaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            {...props}
            page={page}
            total={total}
            className="border-secondary flex w-full items-center justify-between gap-3 border-t px-4 py-3 md:px-6 md:pt-3 md:pb-4"
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? previousLabel : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} rounded={rounded} {...page} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="text-tertiary flex size-9 shrink-0 items-center justify-center">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="text-fg-secondary flex justify-center text-sm whitespace-pre md:hidden">
                            {(pageLabel ?? defaultPageLabel)(currentPage, total)}
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? nextLabel : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

interface PaginationCardMinimalProps extends PaginationLabelsProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The number of items per page. */
    pageSize?: number;
    /** The alignment of the pagination. */
    align?: "left" | "center" | "right";
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
    /** The function to call when the page size changes. */
    onPageSizeChange?: (pageSize: number) => void;
    /** Accessible label for the page-size `Select`. @default "Page Size" */
    pageSizeLabel?: string;
}

export const PaginationCardMinimal = ({
    page = 1,
    total = 10,
    pageSize = 10,
    align = "left",
    onPageChange,
    className,
    onPageSizeChange,
    previousLabel = "Previous",
    nextLabel = "Next",
    pageLabel,
    pageSizeLabel = "Page Size",
}: PaginationCardMinimalProps) => {
    return (
        <nav aria-label="Pagination" className={cx("border-secondary border-t px-4 py-3 md:px-6 md:pt-3 md:pb-4", className)}>
            <MobilePagination page={page} total={total} onPageChange={onPageChange} pageLabel={pageLabel} />

            <div className={cx("hidden items-center gap-3 md:flex", align === "center" && "justify-between")}>
                <div className={cx(align === "center" && "flex flex-1 justify-start")}>
                    <Button isDisabled={page === 1} color="secondary" size="sm" onClick={() => onPageChange?.(Math.max(0, page - 1))}>
                        {previousLabel}
                    </Button>
                </div>

                <div
                    className={cx(
                        "flex items-center gap-3",
                        align === "right" && "order-first me-auto",
                        align === "left" && "order-last ms-auto flex-row-reverse",
                    )}
                >
                    <span className="text-fg-secondary text-sm font-medium">{(pageLabel ?? defaultPageLabel)(page, total)}</span>
                    <Select
                        aria-label={pageSizeLabel}
                        value={pageSize}
                        onChange={(value) => onPageSizeChange?.(value as number)}
                        size="sm"
                        items={[
                            { label: "10 per page", id: 10 },
                            { label: "25 per page", id: 25 },
                            { label: "50 per page", id: 50 },
                            { label: "100 per page", id: 100 },
                        ]}
                    >
                        {(item) => (
                            <Select.Item id={item.id} key={item.id}>
                                {item.label?.split(" ")[0]}
                            </Select.Item>
                        )}
                    </Select>
                </div>
                <div className={cx(align === "center" && "flex flex-1 justify-end")}>
                    <Button isDisabled={page === total} color="secondary" size="sm" onClick={() => onPageChange?.(Math.min(total, page + 1))}>
                        {nextLabel}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

interface PaginationButtonGroupProps extends Partial<Omit<PaginationRootProps, "children">>, PaginationLabelsProps {
    /** The alignment of the pagination. */
    align?: "left" | "center" | "right";
}

export const PaginationButtonGroup = ({
    align = "left",
    page = 1,
    total = 10,
    previousLabel = "Previous",
    nextLabel = "Next",
    ...props
}: PaginationButtonGroupProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <div
            className={cx(
                "border-secondary flex border-t px-4 py-3 md:px-6 md:pt-3 md:pb-4",
                align === "left" && "justify-start",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
            )}
        >
            <Pagination.Root {...props} page={page} total={total}>
                <Pagination.Context>
                    {({ pages }) => (
                        <ButtonGroup size="sm">
                            <Pagination.PrevTrigger asChild>
                                <ButtonGroupItem iconLeading={ArrowLeft}>{isDesktop ? previousLabel : undefined}</ButtonGroupItem>
                            </Pagination.PrevTrigger>

                            {pages.map((page, index) =>
                                page.type === "page" ? (
                                    <Pagination.Item key={index} {...page} asChild>
                                        <ButtonGroupItem isSelected={page.isCurrent} className="size-9 items-center justify-center">
                                            {page.value}
                                        </ButtonGroupItem>
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Ellipsis key={index}>
                                        <ButtonGroupItem className="pointer-events-none size-9 items-center justify-center rounded-none!">
                                            &#8230;
                                        </ButtonGroupItem>
                                    </Pagination.Ellipsis>
                                ),
                            )}

                            <Pagination.NextTrigger asChild>
                                <ButtonGroupItem iconTrailing={ArrowRight}>{isDesktop ? nextLabel : undefined}</ButtonGroupItem>
                            </Pagination.NextTrigger>
                        </ButtonGroup>
                    )}
                </Pagination.Context>
            </Pagination.Root>
        </div>
    );
};

interface PaginationCardAdvancedProps extends Pick<PaginationLabelsProps, "pageLabel"> {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The number of items per page. */
    pageSize?: number;
    /** The alignment of the pagination. */
    align?: "space-between" | "center";
    /** The class name of the pagination component. */
    className?: string;
    /** The function to call when the page changes. */
    onPageChange?: (page: number) => void;
    /** The function to call when the page size changes. */
    onPageSizeChange?: (pageSize: number) => void;
    /** Accessible label for the page-size `Select`. @default "Page Size" */
    pageSizeLabel?: string;
}

export const PaginationCardAdvanced = ({
    page = 1,
    total = 10,
    pageSize = 10,
    align = "space-between",
    onPageChange,
    className,
    onPageSizeChange,
    pageLabel,
    pageSizeLabel = "Page Size",
}: PaginationCardAdvancedProps) => {
    return (
        <div className={cx("border-secondary border-t px-4 py-3 md:px-6 md:pt-3 md:pb-4", className)}>
            <Pagination.Root
                page={page}
                total={total}
                onPageChange={onPageChange}
                className={cx("flex items-center gap-3", align === "center" && "justify-between")}
            >
                <div className="text-fg-secondary hidden items-center gap-2 text-sm font-medium whitespace-nowrap md:flex">
                    Page
                    <InputBase
                        aria-label="Page"
                        value={page.toString()}
                        onChange={(event) => onPageChange?.(Number(event.target.value))}
                        size="sm"
                        wrapperClassName="min-w-9"
                        inputClassName="text-center min-w-9 field-sizing-content"
                    />
                    of {total}
                </div>

                <hr className={cx("border-primary mx-1 h-4 w-px border-s max-md:hidden", align === "center" && "hidden")} />

                <div className={cx("hidden items-center gap-2 md:flex", align === "center" && "order-last")}>
                    <span className="text-secondary text-sm font-medium whitespace-nowrap">Rows per page</span>
                    <Select
                        aria-label={pageSizeLabel}
                        value={pageSize}
                        onChange={(value) => onPageSizeChange?.(value as number)}
                        size="sm"
                        items={[
                            { label: "10", id: 10 },
                            { label: "25", id: 25 },
                            { label: "50", id: 50 },
                            { label: "100", id: 100 },
                        ]}
                    >
                        {(item) => (
                            <Select.Item selectionIndicator="none" id={item.id}>
                                {item.label}
                            </Select.Item>
                        )}
                    </Select>
                </div>

                <div className={cx("flex flex-1 items-center gap-4 md:ms-auto md:justify-end", align === "center" && "md:justify-center")}>
                    <div className="flex gap-2">
                        <Button
                            aria-label="Go to first page"
                            iconLeading={ChevronLeftDouble}
                            color="secondary"
                            size="sm"
                            isDisabled={page === 1}
                            onClick={() => onPageChange?.(1)}
                        />
                        <Pagination.PrevTrigger asChild>
                            <Button iconLeading={ChevronLeft} color="secondary" size="sm" />
                        </Pagination.PrevTrigger>
                    </div>

                    <Pagination.Context>
                        {({ pages, currentPage, total }) => (
                            <>
                                <div className="hidden justify-center gap-0.5 md:flex">
                                    {pages.map((page, index) =>
                                        page.type === "page" ? (
                                            <PaginationItem key={index} {...page} />
                                        ) : (
                                            <Pagination.Ellipsis key={index} className="text-tertiary flex size-9 shrink-0 items-center justify-center">
                                                &#8230;
                                            </Pagination.Ellipsis>
                                        ),
                                    )}
                                </div>

                                <div className="text-fg-secondary flex flex-1 justify-center text-sm whitespace-pre md:hidden">
                                    {(pageLabel ?? defaultPageLabel)(currentPage, total)}
                                </div>
                            </>
                        )}
                    </Pagination.Context>

                    <div className="flex gap-2">
                        <Button
                            aria-label="Go to last page"
                            iconTrailing={ChevronRightDouble}
                            color="secondary"
                            size="sm"
                            isDisabled={page === total}
                            onClick={() => onPageChange?.(total)}
                        />
                        <Pagination.NextTrigger asChild>
                            <Button iconTrailing={ChevronRight} color="secondary" size="sm" />
                        </Pagination.NextTrigger>
                    </div>
                </div>
            </Pagination.Root>
        </div>
    );
};

export interface PaginationCursorProps extends Pick<PaginationLabelsProps, "previousLabel" | "nextLabel"> {
    /** Whether a previous page is available. When `false`, the previous trigger is disabled. @default false */
    hasPrevious?: boolean;
    /** Whether a next page is available. When `false`, the next trigger is disabled. @default false */
    hasNext?: boolean;
    /** Called when the previous trigger is pressed. */
    onPrevious?: () => void;
    /** Called when the next trigger is pressed. */
    onNext?: () => void;
    /** Accessible label for the `<nav>` landmark. @default "Pagination" */
    "aria-label"?: string;
    /** The class name of the pagination component. */
    className?: string;
}

/**
 * Pagination for a cursor-based/unknown-total feed (e.g. a `has_next`/`has_previous` API
 * response): just a previous and a next trigger, each disabled when there is nowhere to go.
 * Unlike every other variant in this file, it never renders "Page X of Y" — there is no `total`
 * to know.
 */
export const PaginationCursor = ({
    hasPrevious = false,
    hasNext = false,
    onPrevious,
    onNext,
    previousLabel = "Previous",
    nextLabel = "Next",
    "aria-label": ariaLabel = "Pagination",
    className,
}: PaginationCursorProps) => (
    <nav aria-label={ariaLabel} className={cx("border-secondary flex w-full items-center justify-between gap-3 border-t pt-4 md:pt-5", className)}>
        <Button iconLeading={ArrowLeft} color="secondary" size="sm" isDisabled={!hasPrevious} onClick={onPrevious}>
            {previousLabel}
        </Button>
        <Button iconTrailing={ArrowRight} color="secondary" size="sm" isDisabled={!hasNext} onClick={onNext}>
            {nextLabel}
        </Button>
    </nav>
);
