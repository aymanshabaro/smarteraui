import type { FC } from "react";
import * as Demos from "./legal-pages.demo";
import { variantsA } from "./variants.a";

export default {
    title: "Page examples/Legal pages",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full">
                <Story />
            </div>
        ),
    ],
};

export const LegalPageExample = () => <Demos.LegalPageExample />;
LegalPageExample.storyName = "Legal page example";

export const LegalPage01 = () => {
    const Variant = variantsA["legal-page-01"];
    return <Variant />;
};
LegalPage01.storyName = "Legal page 01";

export const LegalPage04 = () => {
    const Variant = variantsA["legal-page-04"];
    return <Variant />;
};
LegalPage04.storyName = "Legal page 04";

export const LegalPage02 = () => {
    const Variant = variantsA["legal-page-02"];
    return <Variant />;
};
LegalPage02.storyName = "Legal page 02";

export const LegalPage05 = () => {
    const Variant = variantsA["legal-page-05"];
    return <Variant />;
};
LegalPage05.storyName = "Legal page 05";

export const LegalPage03 = () => {
    const Variant = variantsA["legal-page-03"];
    return <Variant />;
};
LegalPage03.storyName = "Legal page 03";
