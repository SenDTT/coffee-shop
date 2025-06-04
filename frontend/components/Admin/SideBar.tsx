import { FaTimes } from "react-icons/fa";
import { SidebarProps } from "../../types/Admin";

const Sidebar = ({ title, isOpen, onClose, children, className }: SidebarProps) => {
    return (
        <div className="relative">
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-40 
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed z-50 bg-white shadow-lg transform transition-transform duration-300
                    flex flex-col
                    h-[95vh] sm:h-full
                    bottom-0 sm:top-0
                    w-screen sm:w-[400px]
                    rounded-t-2xl sm:rounded-none sm:rounded-l-xl
                    ${isOpen
                        ? "translate-y-0 sm:translate-x-0 sm:translate-y-0"
                        : "translate-y-full sm:translate-x-full sm:translate-y-0"}
                    sm:right-0 sm:left-auto left-0
                `}
            >
                {/* Header */}
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

                {/* Content */}
                <div className="overflow-auto flex-1">{children}</div>
            </aside>
        </div>
    );
};

export default Sidebar;
