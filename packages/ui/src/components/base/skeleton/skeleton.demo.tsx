"use client";

import { Skeleton, SkeletonText } from "./skeleton";

export const SkeletonExample = () => (
    <div className="flex flex-col items-start gap-4">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-4 w-64 rounded-full" />
        <Skeleton className="h-4 w-40 rounded-full" />
    </div>
);

export const Avatar = () => (
    <div className="flex items-center gap-4">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="size-16 rounded-full" />
    </div>
);

export const TextBlock = () => (
    <div className="flex w-80 flex-col gap-4">
        <Skeleton className="h-4 w-40 rounded-full" />
        <SkeletonText lines={3} />
    </div>
);

export const CardSkeleton = () => (
    <div className="border-secondary flex w-80 flex-col gap-4 rounded-xl border p-4">
        <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-3 w-32 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-full" />
            </div>
        </div>
        <SkeletonText lines={2} />
    </div>
);
