// components/FaqItem.tsx

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type FaqItemProps = {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
};

export default function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
    return (
        <div className="border-b border-latte-100 pb-2">
            <button
                onClick={onClick}
                className="flex flex-row justify-between items-center w-full text-left font-serif font-semibold text-base text-latte-200 py-2"
            >
                {question}
                {isOpen ? (
                    <IoIosArrowUp className="w-5 h-5 text-latte-200" />
                ) : (
                    <IoIosArrowDown className="w-5 h-5 text-latte-200" />
                )}
            </button>
            {isOpen && (
                <p className="text-latte-200 pl-4 text-sm">{answer}</p>
            )}
        </div>
    );
}
