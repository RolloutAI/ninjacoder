"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
    XIcon,
    Loader2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const router = useRouter();
    const submissionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    const onDrop = useCallback((acceptedFiles: any) => {
        const newFiles = acceptedFiles.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                progress: 0,
            })
        );
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        newFiles.forEach((file: any) => {
            const interval = setInterval(() => {
                setFiles((prevFiles) =>
                    prevFiles.map((prevFile) => {
                        if (prevFile.name === file.name) {
                            const newProgress = prevFile.progress + 10;
                            if (newProgress >= 100) {
                                clearInterval(interval);
                                return { ...prevFile, progress: 100 };
                            }
                            return { ...prevFile, progress: newProgress };
                        }
                        return prevFile;
                    })
                );
            }, 200);
        });
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        accept: { "image/*": [] },
    });

    const removeFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    const handleSubmit = async () => {
        if ((!value.trim() && files.length === 0) || isLoading) return;

        setIsLoading(true);
        submissionTimeoutRef.current = setTimeout(() => {
            router.push('/editor');
            setIsLoading(false);
        }, 3000);
    };

    const handleCancel = () => {
        if (submissionTimeoutRef.current) {
            clearTimeout(submissionTimeoutRef.current);
            submissionTimeoutRef.current = null;
        }
        setIsLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim() || files.length > 0) {
                handleSubmit();
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-8 space-y-8">
            <h1 className="text-4xl font-bold text-center text-black dark:text-white">
                What can I help you ship?
            </h1>

            <div className="w-full" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
                    <div className="overflow-y-auto rounded-xl">
                        {files.length > 0 && (
                            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {files.map((file) => (
                                    <div key={file.name} className="relative group">
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => removeFile(file.name)}
                                                className="text-white p-1 bg-red-500 rounded-full"
                                            >
                                                <XIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {file.progress < 100 && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-700 rounded-b-lg">
                                                <div
                                                    className="h-1 bg-green-500 rounded-b-lg"
                                                    style={{ width: `${file.progress}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask v0 a question..."
                            disabled={isLoading}
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-neutral-500 placeholder:text-sm",
                                "min-h-[60px]",
                                "rounded-xl",
                                isLoading && "opacity-50"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={open}
                                disabled={isLoading}
                                className="group p-2 hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                                <Paperclip className="w-4 h-4 text-white" />
                                <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
                                    Attach
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={isLoading}
                                className="px-2 py-1 rounded-xl text-sm text-zinc-400 transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1 disabled:opacity-50"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Project
                            </button>
                            <button
                                type="button"
                                onClick={isLoading ? handleCancel : handleSubmit}
                                disabled={(!value.trim() && files.length === 0) && !isLoading}
                                className={cn(
                                    "px-3 py-1.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2",
                                    isLoading
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : (value.trim() || files.length > 0)
                                        ? "bg-white text-black hover:bg-neutral-200"
                                        : "text-zinc-400 border border-zinc-700",
                                    ((!value.trim() && files.length === 0) && !isLoading) && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Cancel</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpIcon
                                            className={cn(
                                                "w-4 h-4",
                                                (value.trim() || files.length > 0) && !isLoading
                                                    ? "text-black"
                                                    : "text-zinc-400"
                                            )}
                                        />
                                    </>
                                )}
                                <span className="sr-only">{isLoading ? "Cancel submission" : "Send"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-4">
                    <ActionButton
                        icon={<ImageIcon className="w-4 h-4" />}
                        label="Clone a Screenshot"
                        disabled={isLoading}
                    />
                    <ActionButton
                        icon={<Figma className="w-4 h-4" />}
                        label="Import from Figma"
                        disabled={isLoading}
                    />
                    <ActionButton
                        icon={<FileUp className="w-4 h-4" />}
                        label="Upload a Project"
                        disabled={isLoading}
                    />
                    <ActionButton
                        icon={<MonitorIcon className="w-4 h-4" />}
                        label="Landing Page"
                        disabled={isLoading}
                    />
                    <ActionButton
                        icon={<CircleUserRound className="w-4 h-4" />}
                        label="Sign Up Form"
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
}

function ActionButton({ icon, label, disabled }: ActionButtonProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white transition-colors",
                disabled && "opacity-50 cursor-not-allowed hover:bg-neutral-900 hover:text-neutral-400"
            )}
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
} 