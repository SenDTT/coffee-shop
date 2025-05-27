import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function Title(props: { title: string, parentPath?: string }) {
    const { title, parentPath } = props;

    return (
        <div className="w-full flex sm:justify-between gap-2 bg-white/50 rounded-lg py-3 px-4 shadow-md mb-4">
            <h1 className="text-lg sm:text-xl font-bold text-coastal-light-text inline-flex flex-row items-center gap-2">
                {parentPath && (<Link className="bg-coastal-light-text rounded-md cursor-pointer" href={parentPath}><IoIosArrowBack className="text-md text-coastal-light-bg" /></Link>)}
                <span className="block">{title}</span>
            </h1>
        </div>
    );
}