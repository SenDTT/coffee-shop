import { AdminTableProps } from "../../types/Product";
import React, { useEffect } from "react";
import { getNestedValue } from "../../utils/stringUtil";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Pagination from "./Pagination";

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
    setSelectedIds,
    activeHandle
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
        if (onShowDeleteMultipleHandle) {
            if (selectedIds.size > 0) {
                onShowDeleteMultipleHandle(true);
            } else {
                onShowDeleteMultipleHandle(false)
            }
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
                                <th className="text-left p-3">
                                    <input
                                        className=""
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

                            {/* Active column */}
                            {activeHandle && (<th className="text-left px-4 py-3 text-sm font-bold text-gray-600">Active</th>)}

                            {/* Actions column */}
                            {hasActionsCol && (deleteHandle || editHandle || viewHandle) && (
                                <th className="text-left px-4 py-3 text-sm font-bold text-gray-600">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {loading && <tr className="bg-white"><td className="p-3 text-center" colSpan={columns.length + (showCheckbox ? 1 : 0) + (hasActionsCol ? 1 : 0) + (activeHandle ? 1 : 0)}><AiOutlineLoading3Quarters className="animate-spin mx-4" /></td></tr>}
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

                                {/* Active */}
                                {activeHandle && (
                                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                                        <div className="flex justify-start items-center gap-2">
                                            <div className="flex items-center">
                                                {typeof (row as any)?.active !== "undefined" && (
                                                    <input
                                                        type="checkbox"
                                                        title="Toggle active"
                                                        name={`active-${row._id}`}
                                                        checked={typeof (row as any)?.active !== "undefined" ? (row as any).active === 1 : false}
                                                        onChange={() => activeHandle(row._id)}
                                                        className="mr-2 text-coastal-additional-info"
                                                    />
                                                )}
                                                {typeof (row as any)?.role !== "undefined" && (
                                                    <input
                                                        type="checkbox"
                                                        title="Toggle active"
                                                        name={`active-${row._id}`}
                                                        checked={typeof (row as any)?.role !== "undefined" ? (row as any).role === 'admin' : false}
                                                        onChange={() => activeHandle(row._id)}
                                                        className="mr-2 text-coastal-additional-info"
                                                    />
                                                )}

                                            </div>
                                        </div>
                                    </td>
                                )}

                                {/* Actions */}
                                {hasActionsCol && (deleteHandle || editHandle || viewHandle) && (
                                    <td className="px-4 py-2 text-sm text-gray-700 text-center">
                                        <div className="flex justify-start items-center gap-2">
                                            {viewHandle && <FaEye className="text-coastal-dark-bg size-4 cursor-pointer" onClick={() => viewHandle(row._id)} />}
                                            {editHandle && <FaPen className="text-coastal-additional-info cursor-pointer" onClick={() => editHandle(row._id)} />}
                                            {deleteHandle && <FaTrash className="text-gray-400 cursor-pointer" onClick={() => deleteHandle(row._id)} />}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <Pagination pageSize={pageSize} rows={rows} onPageChangeHandle={onPageChangeHandle} totalPages={totalPages} currentPage={currentPage} totalRecords={totalRecords} />
        </div>
    );
};

export default AdminTable;
