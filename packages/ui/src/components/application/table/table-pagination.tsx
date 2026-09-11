"use client";

// TODO(orchestrator): candidate for components/internal — these two footers duplicate
// `PaginationPageMinimalCenter` and `PaginationCardMinimal` from
// `@/components/application/pagination/pagination`. That module cannot be imported yet because it
// imports `@/components/base/select/select`, which does not exist in this repo. Once `base/select`
// lands, delete this file and import both footers from the pagination component instead (the
// page-size control below should then become the real `<Select />`).
import { ArrowLeft, ArrowRight } from "@properui/icons";
import { useBreakpoint } from "../../../hooks/use-breakpoint";
import { cx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { DemoNativeSelect } from "../../base/input/input-native-select";
import { Pagination } from "../pagination/pagination-base";

const PaginationNumber = ({ value, isCurrent }: { value: number; isCurrent: boolean }) => (
    <Pagination.Item
        value={value}
        isCurrent={isCurrent}
        className={({ isSelected }) =>
            cx(
                "text-quaternary outline-focus-ring hover:bg-primary_hover hover:text-secondary focus-visible:bg-primary_hover flex size-9 cursor-pointer items-center justify-center rounded-lg p-3 text-sm font-medium transition duration-100 ease-linear focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
                isSelected && "bg-primary_hover text-secondary",
            )
        }
    >
        {value}
    </Pagination.Item>
);

interface TablePaginationProps {
    /** The current page. */
    page?: number;
    /** The total number of pages. */
    total?: number;
    /** The class name of the pagination footer. */
    className?: string;
    /** Called when the page changes. */
    onPageChange?: (page: number) => void;
}

/** Numbered pagination footer, centred between "Previous" and "Next" buttons. */
export const TablePaginationNumbered = ({ page = 1, total = 10, className, onPageChange }: TablePaginationProps) => {
    const isDesktop = useBreakpoint("md");

    return (
        <Pagination.Root
            page={page}
            total={total}
            onPageChange={onPageChange}
            className={cx("border-secondary flex w-full items-center justify-between gap-3 border-t", className)}
        >
            <div className="flex flex-1 justify-start">
                <Pagination.PrevTrigger asChild>
                    <Button aria-label="Go to previous page" iconLeading={ArrowLeft} color="secondary" size="sm">
                        {isDesktop ? "Previous" : undefined}
                    </Button>
                </Pagination.PrevTrigger>
            </div>

            <Pagination.Context>
                {({ pages, currentPage, total }) => (
                    <>
                        <div className="hidden justify-center gap-0.5 md:flex">
                            {pages.map((item, index) =>
                                item.type === "page" ? (
                                    <PaginationNumber key={index} value={item.value} isCurrent={item.isCurrent} />
                                ) : (
                                    <Pagination.Ellipsis key={index} className="text-tertiary flex size-9 shrink-0 items-center justify-center">
                                        &#8230;
                                    </Pagination.Ellipsis>
                                ),
                            )}
                        </div>

                        <div className="text-fg-secondary flex justify-center text-sm whitespace-pre md:hidden">
                            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{total}</span>
                        </div>
                    </>
                )}
            </Pagination.Context>

            <div className="flex flex-1 justify-end">
                <Pagination.NextTrigger asChild>
                    <Button aria-label="Go to next page" iconTrailing={ArrowRight} color="secondary" size="sm">
                        {isDesktop ? "Next" : undefined}
                    </Button>
                </Pagination.NextTrigger>
            </div>
        </Pagination.Root>
    );
};

interface TablePaginationMinimalProps extends TablePaginationProps {
    /** The number of rows per page. */
    pageSize?: number;
    /** The alignment of the page indicator. */
    align?: "left" | "center" | "right";
}

/** Minimal pagination footer with a page indicator and a page-size control. */
export const TablePaginationMinimal = ({ page = 1, total = 10, pageSize = 10, align = "left", className, onPageChange }: TablePaginationMinimalProps) => {
    return (
        <nav aria-label="Pagination" className={cx("border-secondary border-t px-4 py-3 md:px-6 md:pt-3 md:pb-4", className)}>
            <div className="flex items-center justify-between md:hidden">
                <Button
                    aria-label="Go to previous page"
                    iconLeading={ArrowLeft}
                    color="secondary"
                    size="sm"
                    isDisabled={page === 1}
                    onClick={() => onPageChange?.(Math.max(1, page - 1))}
                />
                <span className="text-fg-secondary text-sm">
                    Page <span className="font-medium">{page}</span> of <span className="font-medium">{total}</span>
                </span>
                <Button
                    aria-label="Go to next page"
                    iconLeading={ArrowRight}
                    color="secondary"
                    size="sm"
                    isDisabled={page === total}
                    onClick={() => onPageChange?.(Math.min(total, page + 1))}
                />
            </div>

            <div className={cx("hidden items-center gap-3 md:flex", align === "center" && "justify-between")}>
                <div className={cx(align === "center" && "flex flex-1 justify-start")}>
                    <Button isDisabled={page === 1} color="secondary" size="sm" onClick={() => onPageChange?.(Math.max(1, page - 1))}>
                        Previous
                    </Button>
                </div>

                <div
                    className={cx(
                        "flex items-center gap-3",
                        align === "right" && "order-first me-auto",
                        align === "left" && "order-last ms-auto flex-row-reverse",
                    )}
                >
                    <span className="text-fg-secondary text-sm font-medium">
                        Page {page} of {total}
                    </span>
                    <DemoNativeSelect
                        aria-label="Page size"
                        size="sm"
                        className="w-max"
                        defaultValue={String(pageSize)}
                        options={[
                            { label: "10 per page", value: "10" },
                            { label: "25 per page", value: "25" },
                            { label: "50 per page", value: "50" },
                            { label: "100 per page", value: "100" },
                        ]}
                    />
                </div>

                <div className={cx(align === "center" && "flex flex-1 justify-end")}>
                    <Button isDisabled={page === total} color="secondary" size="sm" onClick={() => onPageChange?.(Math.min(total, page + 1))}>
                        Next
                    </Button>
                </div>
            </div>
        </nav>
    );
};
