"use client";

import { ImagePicker as ImagePickerRoot } from "@/components/application/image-picker/image-picker";

/** The card shown in both example rows: an empty picker ready to accept an image. */
const ImagePickerCard = () => (
    <ImagePickerRoot.Provider>
        <div className="bg-primary ring-secondary_alt relative flex w-80 flex-col overflow-clip rounded-2xl shadow-xl ring-1">
            <div className="flex w-full flex-col gap-4 p-5">
                <div className="flex flex-col gap-4">
                    <ImagePickerRoot.DropZone />

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <ImagePickerRoot.FillModeSelect />
                            <ImagePickerRoot.RotateButton />
                        </div>

                        <ImagePickerRoot.AdjustmentSliders />
                    </div>
                </div>
            </div>
        </div>
    </ImagePickerRoot.Provider>
);

export const ImagePickerExample = () => (
    <div className="flex items-center justify-center p-4">
        <ImagePickerCard />
    </div>
);

export const ImagePicker = () => (
    <div className="flex items-center justify-center p-4">
        <ImagePickerCard />
    </div>
);
