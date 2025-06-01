import { AdminFormFieldWithValue } from "@/types/Product";

export default function InputText(props: AdminFormFieldWithValue) {
    return (
        <>
            {props.type === "text" && typeof props.value === 'string' && (
                typeof props.prefix !== "undefined" ? (
                    <div className="inline-flex items-center sm:w-full">
                        <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-s-md text-gray-700">
                            {props.prefix ? props.prefix : "EXAMPLE"}
                        </span>
                        <input
                            type="text"
                            name={props.name}
                            value={props.value}
                            onChange={props.onChange}
                            className="px-3 py-2 w-full border border-gray-300 rounded-e-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                            placeholder={props.placeholder}
                        />
                    </div>
                ) : (
                    <input
                        type="text"
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coastal-light-text"
                        placeholder={props.placeholder}
                    />
                )
            )}
        </>
    )
}