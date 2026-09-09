"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider as AriaRouterProvider } from "react-aria-components";

declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
    }
}

/**
 * Wires React Aria's client-side navigation to the Next.js router so every
 * component that accepts `href` performs a client-side transition.
 */
export const RouterProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    return <AriaRouterProvider navigate={router.push}>{children}</AriaRouterProvider>;
};
