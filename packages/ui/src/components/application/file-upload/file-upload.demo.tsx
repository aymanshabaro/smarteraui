"use client";

import { useState } from "react";
import { Draggable } from "@/components/application/file-upload/draggable";
import { FileUpload, getReadableFileSize } from "@/components/application/file-upload/file-upload-base";

const uploadFile = (file: File, onProgress: (progress: number) => void) => {
    // Add your upload logic here...

    // This is dummy upload logic
    let progress = 0;
    const interval = setInterval(() => {
        onProgress(++progress);
        if (progress === 100) {
            clearInterval(interval);
        }
    }, 100);
};

type UploadedFile = { id: string; name: string; size: number; progress: number; type?: string; failed?: boolean };

const placeholderFiles: UploadedFile[] = [
    {
        id: "file-01",
        name: "Example dashboard screenshot.jpg",
        type: "jpg",
        size: 720 * 1024,
        progress: 50,
    },
    {
        id: "file-02",
        name: "Tech design requirements_2.pdf",
        type: "pdf",
        size: 720 * 1024,
        progress: 100,
    },
    {
        id: "file-03",
        name: "Tech design requirements.pdf",
        type: "pdf",
        failed: true,
        size: 1024 * 1024 * 1,
        progress: 0,
    },
];

/** The three files shown as drag-and-drop targets above the main examples. */
const DraggableRow = () => (
    <div className="hidden w-full max-w-[512px] grid-cols-[repeat(3,146px)] justify-between gap-2 md:grid">
        <Draggable name="chatgpt-clone.ts" type="application/typescript" size={1024 * 1024 * 0.5} />
        <Draggable name="commercial.mp4" type="video/mp4" size={1024 * 1024 * 2.2} />
        <Draggable name="invoice.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
    </div>
);

export const FileUploadExample = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(placeholderFiles);

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        const newFilesWithIds = newFiles.map((file) => ({
            id: Math.random().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            fileObject: file,
        }));

        setUploadedFiles([...newFilesWithIds.map(({ fileObject: _, ...file }) => file), ...uploadedFiles]);

        newFilesWithIds.forEach(({ id, fileObject }) => {
            uploadFile(fileObject, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    const handleDeleteFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const handleRetryFile = (id: string) => {
        const file = uploadedFiles.find((file) => file.id === id);
        if (!file) return;

        uploadFile(new File([], file.name, { type: file.type }), (progress) => {
            setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress, failed: false } : uploadedFile)));
        });
    };

    return (
        <div data-drag-constraint className="flex w-full max-w-lg flex-col items-center gap-6">
            <DraggableRow />

            <FileUpload.Root className="w-full">
                <FileUpload.DropZone onDropFiles={handleDropFiles} />

                <FileUpload.List>
                    {uploadedFiles.map((file) => (
                        <FileUpload.ListItemProgressBar
                            key={file.id}
                            {...file}
                            size={file.size}
                            onDelete={() => handleDeleteFile(file.id)}
                            onRetry={() => handleRetryFile(file.id)}
                        />
                    ))}
                </FileUpload.List>
            </FileUpload.Root>
        </div>
    );
};

export const ProgressBar = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(placeholderFiles);

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        const newFilesWithIds = newFiles.map((file) => ({
            id: Math.random().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            fileObject: file,
        }));

        setUploadedFiles([...newFilesWithIds.map(({ fileObject: _, ...file }) => file), ...uploadedFiles]);

        newFilesWithIds.forEach(({ id, fileObject }) => {
            uploadFile(fileObject, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    const handleDeleteFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const handleRetryFile = (id: string) => {
        const file = uploadedFiles.find((file) => file.id === id);
        if (!file) return;

        uploadFile(new File([], file.name, { type: file.type }), (progress) => {
            setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress, failed: false } : uploadedFile)));
        });
    };

    return (
        <div data-drag-constraint className="flex w-full max-w-lg flex-col items-center gap-6">
            <DraggableRow />

            <FileUpload.Root className="w-full">
                <FileUpload.DropZone onDropFiles={handleDropFiles} />

                <FileUpload.List>
                    {uploadedFiles.map((file) => (
                        <FileUpload.ListItemProgressBar
                            key={file.id}
                            {...file}
                            size={file.size}
                            onDelete={() => handleDeleteFile(file.id)}
                            onRetry={() => handleRetryFile(file.id)}
                        />
                    ))}
                </FileUpload.List>
            </FileUpload.Root>
        </div>
    );
};

export const ProgressFill = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(placeholderFiles);

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        const newFilesWithIds = newFiles.map((file) => ({
            id: Math.random().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            fileObject: file,
        }));

        setUploadedFiles([...newFilesWithIds.map(({ fileObject: _, ...file }) => file), ...uploadedFiles]);

        newFilesWithIds.forEach(({ id, fileObject }) => {
            uploadFile(fileObject, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    const handleDeleteFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const handleRetryFile = (id: string) => {
        const file = uploadedFiles.find((file) => file.id === id);
        if (!file) return;

        uploadFile(new File([], file.name, { type: file.type }), (progress) => {
            setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress, failed: false } : uploadedFile)));
        });
    };

    return (
        <div data-drag-constraint className="flex w-full max-w-lg flex-col items-center gap-6">
            <DraggableRow />

            <FileUpload.Root className="w-full">
                <FileUpload.DropZone onDropFiles={handleDropFiles} />

                <FileUpload.List>
                    {uploadedFiles.map((file) => (
                        <FileUpload.ListItemProgressFill
                            key={file.id}
                            {...file}
                            size={file.size}
                            onDelete={() => handleDeleteFile(file.id)}
                            onRetry={() => handleRetryFile(file.id)}
                        />
                    ))}
                </FileUpload.List>
            </FileUpload.Root>
        </div>
    );
};

export const Disabled = () => {
    return (
        <FileUpload.Root className="w-full max-w-lg">
            <FileUpload.DropZone isDisabled />
        </FileUpload.Root>
    );
};

export const AcceptImageOnly = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        const newFilesWithIds = newFiles.map((file) => ({
            id: Math.random().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            fileObject: file,
        }));

        setUploadedFiles([...newFilesWithIds.map(({ fileObject: _, ...file }) => file), ...uploadedFiles]);

        newFilesWithIds.forEach(({ id, fileObject }) => {
            uploadFile(fileObject, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    const handleDropUnacceptedFiles = (files: FileList) => {
        console.log("Unaccepted files", files);
    };

    const handleDeleteFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const handleRetryFile = (id: string) => {
        const file = uploadedFiles.find((file) => file.id === id);
        if (!file) return;

        uploadFile(new File([], file.name, { type: file.type }), (progress) => {
            setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress, failed: false } : uploadedFile)));
        });
    };

    return (
        <div data-drag-constraint className="flex w-full max-w-lg flex-col items-center gap-6">
            <div className="hidden w-full max-w-[512px] grid-cols-[repeat(3,146px)] justify-between gap-2 md:grid">
                <Draggable name="Screenshot.png" type="image/png" size={1024 * 1024 * 0.8} />
                <Draggable name="IMG_0050.jpeg" type="image/jpeg" size={1024 * 1024 * 1.4} />
                <Draggable name="invoice.pdf" type="application/pdf" size={1024 * 1024 * 1.2} />
            </div>

            <FileUpload.Root className="w-full">
                <FileUpload.DropZone
                    accept="image/*"
                    hint="Please upload PNG or JPEG images only."
                    onDropFiles={handleDropFiles}
                    onDropUnacceptedFiles={handleDropUnacceptedFiles}
                />

                <FileUpload.List>
                    {uploadedFiles.map((file) => (
                        <FileUpload.ListItemProgressBar
                            key={file.id}
                            {...file}
                            size={file.size}
                            onDelete={() => handleDeleteFile(file.id)}
                            onRetry={() => handleRetryFile(file.id)}
                        />
                    ))}
                </FileUpload.List>
            </FileUpload.Root>
        </div>
    );
};

export const MaxSizeLimit = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        const newFilesWithIds = newFiles.map((file) => ({
            id: Math.random().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            fileObject: file,
        }));

        setUploadedFiles([...newFilesWithIds.map(({ fileObject: _, ...file }) => file), ...uploadedFiles]);

        newFilesWithIds.forEach(({ id, fileObject }) => {
            uploadFile(fileObject, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    const handleMaxSizeExceed = (files: FileList) => {
        console.log("Max size exceeded", files);
    };

    const handleDeleteFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const handleRetryFile = (id: string) => {
        const file = uploadedFiles.find((file) => file.id === id);
        if (!file) return;

        uploadFile(new File([], file.name, { type: file.type }), (progress) => {
            setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.id === id ? { ...uploadedFile, progress, failed: false } : uploadedFile)));
        });
    };

    const MAX_SIZE = 1024 * 1024 * 1;

    return (
        <div data-drag-constraint className="flex w-full max-w-lg flex-col items-center gap-6">
            <div className="hidden w-full max-w-[512px] grid-cols-[repeat(3,146px)] justify-between gap-2 md:grid">
                <Draggable name="smaller_file.jpg" type="image/jpeg" size={1024 * 512} />
                <Draggable name="too_large.mp4" type="video/mp4" size={1024 * 1024 * 3} />
                <Draggable name="still_too_large.pdf" type="application/pdf" size={1024 * 1024 * 2} />
            </div>

            <FileUpload.Root className="w-full">
                <FileUpload.DropZone
                    maxSize={MAX_SIZE}
                    hint={`Upload files to add to this project (max. ${getReadableFileSize(MAX_SIZE)}).`}
                    onDropFiles={handleDropFiles}
                    onSizeLimitExceed={handleMaxSizeExceed}
                />

                <FileUpload.List>
                    {uploadedFiles.map((file) => (
                        <FileUpload.ListItemProgressBar
                            key={file.id}
                            {...file}
                            size={file.size}
                            onDelete={() => handleDeleteFile(file.id)}
                            onRetry={() => handleRetryFile(file.id)}
                        />
                    ))}
                </FileUpload.List>
            </FileUpload.Root>
        </div>
    );
};
