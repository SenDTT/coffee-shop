import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import clsx from "clsx";

function Pagination({
    currentPage,
    totalPages,
    totalRecords,
    pageSize,
    rows,
    onPageChangeHandle,
}: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    pageSize: number;
    rows: any[];
    onPageChangeHandle: (page: number) => void;
}) {
    const getPageNumbers = () => {
        const maxVisible = 5;
        const pages: number[] = [];

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 mt-4 gap-2">
            <span>
                Page {currentPage} of {totalPages} — Showing{" "}
                {rows.length ? (currentPage - 1) * pageSize + 1 : 0} –{" "}
                {(currentPage - 1) * pageSize + rows.length} of {totalRecords}
            </span>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChangeHandle(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    aria-label="Previous Page"
                    title="Previous Page"
                >
                    <GrFormPrevious className="size-4 my-1" />
                </button>

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChangeHandle(page)}
                        className={clsx(
                            "px-2 py-1 border rounded",
                            currentPage === page ? "bg-gray-200 font-semibold" : ""
                        )}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onPageChangeHandle(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    aria-label="Next Page"
                    title="Next Page"
                >
                    <MdOutlineNavigateNext className="size-4 my-1" />
                </button>
            </div>
        </div>
    );
}

export default Pagination;
