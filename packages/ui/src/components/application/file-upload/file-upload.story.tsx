import type { FC } from "react";
import * as FileUploads from "./file-upload.demo";

export default {
    title: "Application components/File uploaders",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const FileUploadExample = () => <FileUploads.FileUploadExample />;
FileUploadExample.storyName = "File upload example";

export const ProgressBar = () => <FileUploads.ProgressBar />;
ProgressBar.storyName = "Progress bar";

export const ProgressFill = () => <FileUploads.ProgressFill />;
ProgressFill.storyName = "Progress fill";

export const Disabled = () => <FileUploads.Disabled />;
Disabled.storyName = "Disabled";

export const AcceptImageOnly = () => <FileUploads.AcceptImageOnly />;
AcceptImageOnly.storyName = "Accept image only";

export const MaxSizeLimit = () => <FileUploads.MaxSizeLimit />;
MaxSizeLimit.storyName = "Max size limit";
