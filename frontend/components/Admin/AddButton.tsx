import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function AddButton(props: { path: string }) {
    const { path } = props;

    return (
        <Link href={path} className="cursor-pointer px-2 py-1 bg-coastal-light-text text-coastal-light-bg rounded-md transition-colors text-xs sm:text-base  w-full sm:w-auto">
            <FaPlus className="inline text-md" />
        </Link>
    );
}