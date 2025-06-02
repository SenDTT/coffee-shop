import { useState, useEffect, useRef } from "react";
import { IoMdRemove } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { AdminFormFieldWithValue } from "@/types/Product";

export default function ImageUploader(props: AdminFormFieldWithValue) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const updatedFiles = [...files, ...selectedFiles];
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

    useEffect(() => {
        const urls = files.map((file) => URL.createObjectURL(file));
        setPreviews(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files]);

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
            <div className="flex flex-wrap gap-4">
                {previews.map((src, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={src}
                            alt={`Preview ${index}`}
                            className="w-12 h-12 sm:w-28 sm:h-28 object-cover border rounded"
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

                {/* Upload frame button */}
                <label className="w-12 h-12 sm:w-28 sm:h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-500">
                    <input
                        ref={fileInputRef}
                        type="file"
                        placeholder={props.placeholder}
                        accept={props.accept || "image/*"}
                        name={props.name}
                        onChange={handleFileChange}
                        multiple={props.multiple || false}
                        className="hidden"
                    />
                    <FaPlus className="text-gray-400 text-md" />
                </label>
            </div>
        </div>
    );
}
