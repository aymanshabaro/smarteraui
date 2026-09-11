"use client";

import { useState } from "react";
import * as Paginations from "./pagination";
import { PaginationDot as PaginationDotComponent } from "./pagination-dot";
import { PaginationLine as PaginationLineComponent } from "./pagination-line";

export const PaginationExample = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationPageDefault page={currentPage} onPageChange={setCurrentPage} />;
};

export const PageDefault = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationPageDefault page={currentPage} onPageChange={setCurrentPage} />;
};

export const PageMinimalCenter = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationPageMinimalCenter page={currentPage} onPageChange={setCurrentPage} />;
};

export const CardDefault = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardDefault page={currentPage} onPageChange={setCurrentPage} />;
};

export const CardMinimalRightAligned = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardMinimal align="right" page={currentPage} onPageChange={setCurrentPage} />;
};

export const CardMinimalCenterAligned = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardMinimal align="center" page={currentPage} onPageChange={setCurrentPage} />;
};

export const CardMinimalLeftAligned = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationCardMinimal align="left" page={currentPage} onPageChange={setCurrentPage} />;
};

export const ButtonGroupRightAligned = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationButtonGroup align="right" page={currentPage} onPageChange={setCurrentPage} />;
};

export const ButtonGroupCenterAligned = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationButtonGroup align="center" page={currentPage} onPageChange={setCurrentPage} />;
};

export const ButtonGroupLeftAligned = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return <Paginations.PaginationButtonGroup align="left" page={currentPage} onPageChange={setCurrentPage} />;
};

export const CardAdvanced = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
        <Paginations.PaginationCardAdvanced page={currentPage} total={10} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
    );
};

export const CardAdvancedCenter = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
        <Paginations.PaginationCardAdvanced
            align="center"
            page={currentPage}
            total={10}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
        />
    );
};

export const PaginationDot = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <PaginationDotComponent total={3} size="md" page={currentPage} onPageChange={setCurrentPage} />
            {/* This second row is a purely visual size comparison of the same navigation control above, so it's
                marked `inert` to keep the demo from exposing two "Pagination Navigation" landmarks with the same
                accessible name to assistive tech. */}
            <div inert>
                <PaginationDotComponent total={3} size="lg" page={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export const PaginationLine = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-col gap-8">
            <PaginationLineComponent className="w-36" total={3} size="md" page={currentPage} onPageChange={setCurrentPage} />
            {/* This second row is a purely visual size comparison of the same navigation control above, so it's
                marked `inert` to keep the demo from exposing two "Pagination Navigation" landmarks with the same
                accessible name to assistive tech. */}
            <div inert>
                <PaginationLineComponent className="w-38" total={3} size="lg" page={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};
