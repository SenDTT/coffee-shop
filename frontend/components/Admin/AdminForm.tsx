import { AdminFormProps } from "@/types/Product";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ImageUploader from "./ImageUploader";
import CustomReactSelect from "./ReactSelect";
import InputText from "./InputText";

export default function AdminForm(props: AdminFormProps) {
    const { fields, submitText, cancelText, cancelUrl, isShowButton, onSubmit, className } = props;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        for (const field of fields) {
            if (field.required && (field.value === "" || field.value === null || field.value === undefined)) {
                newErrors[field.name] = `${field.label} is required`;
                continue;
            }

            if (field.validate) {
                const customError = field.validate(field.value);
                if (customError) {
                    newErrors[field.name] = customError;
                }
            }
        }

        if (Object.keys(newErrors).length > 0) {
            props.setErrors?.(newErrors); // Call parent setErrors
            return;
        }

        props.setErrors?.({}); // Clear errors if all good
        onSubmit(e);
    };


    return (
        <div className={`flex flex-col w-full h-full ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full p-6">
                    {fields.map((field, index) => (
                        <div key={index} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1 inline-flex gap-1" htmlFor={field.name}>
                                {field.label}
                                {field.required && <span className="text-red-600">*</span>}
                            </label>

                            {field.type === 'text' && <InputText {...field} />}

                            {field.type === "textarea" && typeof field.value === 'string' && (
                                <textarea
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                                    placeholder={field.placeholder}
                                />
                            )}
                            {['select', 'async-select'].includes(field.type) && (
                                <CustomReactSelect {...field} />
                            )}
                            {field.type === "checkbox" && typeof field.value == "boolean" && (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        placeholder={field.placeholder}
                                        name={field.name}
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="mr-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                </div>
                            )}
                            {field.type === "radio" && field.options && (
                                <div className="flex items-center">
                                    {field.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center mr-4">
                                            <input
                                                placeholder={field.placeholder}
                                                type="radio"
                                                name={field.name}
                                                value={option.value}
                                                checked={field.value === option.value}
                                                onChange={field.onChange}
                                                className="mr-2"
                                            />
                                            <label className="text-sm font-medium text-gray-700">
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {field.type === "file" && (
                                <ImageUploader {...field} />
                            )}
                            {field.type === "date" && typeof field.value === "string" && (
                                <input
                                    type="date"
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                                />
                            )}
                            {field.type === "number" && typeof field.value === "number" && (
                                <input
                                    type="number"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                                    placeholder={field.placeholder}
                                />
                            )}
                            {field.type === "password" && typeof field.value === 'string' && (
                                <input
                                    type="password"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                                    placeholder={field.placeholder}
                                />
                            )}
                            {/* {field.type === "color" && (
                                <input
                                    type="color"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                                />
                            )}
                            {field.type === "range" && (
                                <input
                                    type="range"
                                    name={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                                    min={field.min}
                                    max={field.max}
                                />
                            )}
                            {field.type === "toggle" && (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        checked={field.value}
                                        onChange={field.onChange}
                                        className="toggle toggle-primary"
                                    />
                                    <label className="ml-2 text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                </div>
                            )} */}
                            {field.error && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.error}
                                </p>
                            )}
                            {field.success && (
                                <p className="text-green-500 text-sm mt-1">
                                    {field.success}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {isShowButton && (
                    <div className="flex sm:justify-end gap-2 mb-2 text-sm px-6 py-2">
                        <Link className="px-4 py-2 text-coastal-light-text bg-gray-200 rounded-md transition-colors" href={cancelUrl}>{cancelText || "Cancel"}</Link>
                        <button
                            type="submit"
                            disabled={props.loading}
                            className="px-4 py-2 bg-coastal-light-text text-coastal-light-bg rounded-md hover:bg-coastal-light-text/80 transition-colors inline-flex items-center gap-2"
                        >
                            <AiOutlineLoading3Quarters className={`inline ${props.loading ? "animate-spin mx-6" : "hidden"}`} />
                            <span className={`${props.loading && "hidden"}`}>{submitText || "Submit"}</span>
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}