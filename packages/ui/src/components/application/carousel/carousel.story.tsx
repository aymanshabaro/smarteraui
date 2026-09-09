import type { FC } from "react";
import * as Carousels from "./carousel.demo";

export default {
    title: "Application components/Carousels",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen items-center justify-center p-8">
                <div>
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const CarouselExample = () => <Carousels.CarouselExample />;
CarouselExample.storyName = "Carousel example";

export const CarouselMd = () => <Carousels.CarouselMd />;
CarouselMd.storyName = "Carousel md";

export const CarouselLg = () => <Carousels.CarouselLg />;
CarouselLg.storyName = "Carousel lg";
