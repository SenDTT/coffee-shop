import { FaTimes } from "react-icons/fa";
import { SidebarProps } from "../../types/Admin"

const Sidebar = ({ title, isOpen, onClose, children, className }: SidebarProps) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full ${className} max-w-full rounded-l-lg bg-white z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    } flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="p-4 overflow-auto flex-1">{children}</div>
            </aside>
        </>
    );
};

export default Sidebar;
