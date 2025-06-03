'use client';

import { useState } from "react";

export default function SearchItem(props: { onSearchHanlde: (searchTerm: string) => void }) {
    const { onSearchHanlde } = props;
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        onSearchHanlde(searchTerm);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={(value) => setSearchTerm(value.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 w-full sm:w-auto"
            />
            <button onClick={handleSearch} className="px-4 py-1 bg-coastal-light-text text-coastal-light-bg rounded-md transition-colors sm:w-auto">
                Search
            </button>
        </div>
    );
}