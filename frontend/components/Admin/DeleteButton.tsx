import React from "react";
import { FaTrash } from "react-icons/fa";
import { confirmThemeSwal } from "../../utils/sweetalert";

export default function DeleteButton(props: { deleteIds: string[], onDelete: (ids: string[]) => void }) {
  const { deleteIds, onDelete } = props;

  const handleDelete = () => {
    confirmThemeSwal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete logic here
        onDelete(deleteIds);
      }
    });
  };

  return (<div className="cursor-pointer px-2 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-500 transition-colors text-xs sm:text-base w-full sm:w-auto" onClick={handleDelete}><FaTrash className="inline text-md" /></div>);
};
