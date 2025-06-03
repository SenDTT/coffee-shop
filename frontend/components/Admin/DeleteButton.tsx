import React from "react";
import { FaTrash } from "react-icons/fa";
import { confirmThemeSwal } from "../../utils/sweetalert";

export default function DeleteButton(props: { disabled: boolean, onDelete: () => void }) {
  const { onDelete, disabled } = props;

  const handleDelete = () => {
    if (disabled) return;

    confirmThemeSwal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete logic here
        onDelete();
      }
    });
  };

  return (<div className={`cursor-pointer px-2 py-1 ${disabled ? 'text-gray-400 bg-gray-300' : 'hover:bg-red-500 text-gray-100 bg-red-600'}  rounded-md transition-colors text-xs sm:text-base w-full sm:w-auto`} onClick={handleDelete}><FaTrash className="inline text-md" /></div>);
};
