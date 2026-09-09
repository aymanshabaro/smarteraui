import type { FC } from "react";
import * as Demos from "./section-footers.demo";

export default {
    title: "Application components/Section footers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const SectionFooterExample = () => <Demos.SectionFooterExample />;
SectionFooterExample.storyName = "Section footer example";

export const SectionFooterButtonGroup = () => <Demos.SectionFooterButtonGroup />;
SectionFooterButtonGroup.storyName = "Section footer button group";

export const SectionFooter = () => <Demos.SectionFooter />;
SectionFooter.storyName = "Section footer";

export const SectionFooterCardButtonGroup = () => <Demos.SectionFooterCardButtonGroup />;
SectionFooterCardButtonGroup.storyName = "Section footer card button group";

export const SectionFooterCard = () => <Demos.SectionFooterCard />;
SectionFooterCard.storyName = "Section footer card";
