import React, { useEffect, useState } from "react";
import { AdminFormFieldWithValue } from "@/types/Product";
import { IoMdRemove } from "react-icons/io";

const ImageUploader = (props: AdminFormFieldWithValue) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    // Handle new files (append, don't replace)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);

        const updatedFiles = [...files, ...selectedFiles];
        setFiles(updatedFiles);

        if (props.onChange) {
            // Send back only the updated files
            const syntheticEvent = {
                target: {
                    name: props.name || "images",
                    value: updatedFiles,
                },
            };
            props.onChange(syntheticEvent as any);
        }
    };

    // Generate previews
    useEffect(() => {
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files]);

    // Delete a file by index
    const handleDelete = (indexToRemove: number) => {
        const updatedFiles = files.filter((_, i) => i !== indexToRemove);
        setFiles(updatedFiles);

        if (props.onChange) {
            const syntheticEvent = {
                target: {
                    name: props.name || "images",
                    value: updatedFiles,
                },
            };
            props.onChange(syntheticEvent as any);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <input
                type="file"
                placeholder={props.placeholder}
                accept={props.accept || "image/*"}
                name={props.name}
                onChange={handleFileChange}
                multiple={props.multiple || false}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            />

            <div className="flex flex-wrap gap-4">
                {previews.map((src, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="w-32 h-32 object-cover border rounded"
                        />
                        <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="absolute top-1 right-1 bg-gray-800/60 text-white rounded-full w-6 h-6 text-sm hidden group-hover:flex items-center justify-center"
                            aria-label="Remove image"
                        >
                            <IoMdRemove className="text-lg" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
