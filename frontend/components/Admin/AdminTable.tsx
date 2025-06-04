import { AdminTableProps } from "../../types/Product";
import React, { useEffect, useState } from "react";
import { getNestedValue } from "../../utils/stringUtil";
import { FaEye, FaPen, FaSpinner, FaTrash } from "react-icons/fa";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminTable = <T extends { _id: string }>({
    columns,
    rows,
    headers,
    showCheckbox = false,
    hasActionsCol,
    deleteHandle,
    editHandle,
    viewHandle,
    totalRecords,
    currentPage,
    pageSize = 10,
    onPageChange,
    onShowDeleteMultipleHandle,
    loading,
    selectedIds,
    setSelectedIds
}: AdminTableProps<T>) => {

    const totalPages = Math.ceil(totalRecords / pageSize);

    const toggleRow = (id: string) => {
        const newSet = new Set(selectedIds);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleAll = () => {
        if (selectedIds.size > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(rows.map(row => row._id)));
        }
    };

    useEffect(() => {
        if (selectedIds.size > 0) {
            onShowDeleteMultipleHandle(true);
        } else {
            onShowDeleteMultipleHandle(false)
        }
    }, [selectedIds.size]);

    useEffect(() => {
        setSelectedIds(new Set());
    }, [currentPage, rows]);

    const onPageChangeHandle = (newPage: number) => {
        setSelectedIds(new Set());
        onPageChange(newPage);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="overflow-x-auto min-h-[34rem]">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-100">
                        <tr>
                            {showCheckbox && (
                                <th className="p-3">
                                    <input
                                        className="sm:-ml-3"
                                        aria-label="checkbox-all"
                                        type="checkbox"
                                        checked={selectedIds.size === rows.length && rows.length > 0}
                                        onChange={toggleAll}
                                    />
                                </th>
                            )}
                            {headers.map((name, i) => (
                                <th key={i} className="text-left px-4 py-3 text-sm font-bold text-gray-600">
                                    {name}
                                </th>
                            ))}
                            {hasActionsCol && (deleteHandle || editHandle || viewHandle) && (
                                <th className="text-left px-4 py-3 text-sm font-bold text-gray-600">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {loading && <tr className="bg-white"><td className="p-3 text-center" colSpan={columns.length + (showCheckbox ? 1 : 0) + (hasActionsCol ? 1 : 0)}><AiOutlineLoading3Quarters className="animate-spin mx-4" /></td></tr>}
                        {rows.map((row, index) => (
                            <tr key={row._id} className={(index % 2 === 0 ? "bg-white" : "bg-gray-100")}>
                                {showCheckbox && (
                                    <td className="p-3">
                                        <input
                                            aria-label="checkbox"
                                            type="checkbox"
                                            checked={selectedIds.has(row._id)}
                                            onChange={() => toggleRow(row._id)}
                                        />
                                    </td>
                                )}
                                {columns.map((col, j) => (
                                    <td key={j} className="px-4 py-2 text-sm text-gray-700">
                                        {String(getNestedValue(row, col))}
                                    </td>
                                ))}
                                {hasActionsCol && (deleteHandle || editHandle || viewHandle) && (
                                    <td className="px-4 py-2 text-sm text-gray-700 gap-2 inline-flex">
                                        {viewHandle && <FaEye className="text-coastal-dark-bg size-4 my-2 cursor-pointer" onClick={() => viewHandle(row._id)} />}
                                        {editHandle && <FaPen className="text-coastal-additional-info my-2 cursor-pointer" onClick={() => editHandle(row._id)} />}
                                        {deleteHandle && <FaTrash className="text-gray-400 my-2 cursor-pointer" onClick={() => deleteHandle(row._id)} />}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                <span>
                    Page {currentPage} of {totalPages} — Showing{" "}
                    {rows.length ? (currentPage - 1) * pageSize + 1 : 0} – {(currentPage - 1) * pageSize + rows.length} of {totalRecords}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onPageChangeHandle(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        aria-label="Previous Page"
                        title="Previous Page"
                    >
                        <GrFormPrevious className="size-4 my-1" />
                    </button>
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
        </div>
    );
};

export default AdminTable;
