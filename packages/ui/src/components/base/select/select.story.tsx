import type { FC } from "react";
import * as Selects from "./select.demo";

export default {
    title: "Base components/Select",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <div className="w-80">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const SelectExample = () => <Selects.SelectExample />;
SelectExample.storyName = "Select example";

export const Default = () => <Selects.Default />;

export const Disabled = () => <Selects.Disabled />;

export const Sizes = () => <Selects.Sizes />;

export const IconLeading = () => <Selects.IconLeading />;
IconLeading.storyName = "Icon leading";

export const AvatarLeading = () => <Selects.AvatarLeading />;
AvatarLeading.storyName = "Avatar leading";

export const DotLeading = () => <Selects.DotLeading />;
DotLeading.storyName = "Dot leading";

export const Search = () => <Selects.Search />;

export const Tags = () => <Selects.Tags />;
