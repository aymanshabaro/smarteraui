import type { FC } from "react";
import * as ImagePickers from "./image-picker.demo";

export default {
    title: "Application components/Image pickers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const ImagePickerExample = () => <ImagePickers.ImagePickerExample />;
ImagePickerExample.storyName = "Image picker example";

export const ImagePicker = () => <ImagePickers.ImagePicker />;
ImagePicker.storyName = "Image picker";
