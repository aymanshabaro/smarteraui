"use client";

import { createContext, useContext } from "react";

/** Front-matter every block inside an MDX page may need (CLI slug, source path, title). */
export type DocsPageInfo = {
    pathname: string;
    title: string;
    install?: string;
    source?: string;
    demoFile?: string;
};

const DocsPageContext = createContext<DocsPageInfo>({ pathname: "/", title: "Documentation" });

export const useDocsPage = () => useContext(DocsPageContext);

export const DocsPageProvider = ({ value, children }: { value: DocsPageInfo; children: React.ReactNode }) => (
    <DocsPageContext.Provider value={value}>{children}</DocsPageContext.Provider>
);
