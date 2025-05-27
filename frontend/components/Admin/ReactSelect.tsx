import { useEffect, useState } from "react";
import { AdminFormFieldWithValue } from "@/types/Product";
import { selectOptionStyles } from "@/utils/reactSelect";
import ReactSelect from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

export default function CustomReactSelect(props: AdminFormFieldWithValue) {
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);

    // Load label for selected value if needed
    useEffect(() => {
        const initSelected = async () => {
            if (props.type === "async-select" && props.value && typeof props.value === "string") {
                const existing = props.options?.find((o) => o.value === props.value);
                if (existing) {
                    setSelectedOption(existing);
                } else if (props.fetchOptionsAPI) {
                    const result = await props.fetchOptionsAPI(props.value, 0);
                    const matched = result.data.find((o: any) => o.value === props.value);
                    if (matched) setSelectedOption(matched);
                    else setSelectedOption({ value: props.value, label: props.value }); // fallback
                }
            }
        };
        initSelected();
    }, [props.value]);

    return (
        <>
            {
                props.type === "select" &&
                Array.isArray(props.options) &&
                typeof props.value === "string" && (
                    <ReactSelect
                        name={props.name}
                        options={props.options}
                        value={props.options.find((option) => option.value === props.value) || null}
                        onChange={(newValue: any) => {
                            props.onChange({
                                target: {
                                    name: props.name,
                                    value: newValue.value,
                                },
                            });
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        aria-label={props.label}
                        styles={selectOptionStyles}
                    />
                )
            }
            {
                props.type === "async-select" &&
                props.fetchOptionsAPI &&
                typeof props.value === "string" && (
                    <AsyncPaginate
                        name={props.name}
                        value={selectedOption}
                        loadOptions={async (inputValue, loadedOptions, additional?: { page: number }) => {
                            const response = await props.fetchOptionsAPI!(inputValue, additional?.page || 0);

                            // Optional: Merge with current selectedOption if not included
                            const uniqueOptions = [
                                ...response.data,
                                ...(selectedOption && !response.data.some(o => o.value === selectedOption.value) ? [selectedOption] : [])
                            ];

                            return {
                                options: uniqueOptions,
                                hasMore: response.nextPage !== null,
                                additional: {
                                    page: response.nextPage ?? 0,
                                },
                            };
                        }}
                        onChange={(newValue: any) => {
                            setSelectedOption(newValue);
                            props.onChange({
                                target: {
                                    name: props.name,
                                    value: newValue?.value ?? null,
                                },
                            });
                            if (newValue && props.onSelect) {
                                props.onSelect(newValue);
                            }
                        }}
                        additional={{ page: 0 }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        aria-label={props.label}
                        styles={selectOptionStyles}
                        debounceTimeout={500}
                    />
                )
            }
        </>
    );
}
