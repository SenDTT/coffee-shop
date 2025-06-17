import {
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineAlignRight,
} from 'react-icons/ai'
import { MdFormatAlignJustify } from 'react-icons/md'
import { BiText } from 'react-icons/bi'
import { Editor } from '@tiptap/react'

export default function TextAlignButtons({ editor }: { editor: Editor }) {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {/* Left Align */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded border ${editor.isActive({ textAlign: 'left' }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'
                    }`}
                title="Align Left"
                aria-label="Align Left"
            >
                <AiOutlineAlignLeft size={20} />
            </button>

            {/* Center Align */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded border ${editor.isActive({ textAlign: 'center' }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'
                    }`}
                title="Align Center"
                aria-label="Align Center"
            >
                <AiOutlineAlignCenter size={20} />
            </button>

            {/* Right Align */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded border ${editor.isActive({ textAlign: 'right' }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'
                    }`}
                title="Align Right"
                aria-label="Align Right"
            >
                <AiOutlineAlignRight size={20} />
            </button>

            {/* Justify Align */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-2 rounded border ${editor.isActive({ textAlign: 'justify' }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'
                    }`}
                title="Align Justify"
                aria-label="Align Justify"
            >
                <MdFormatAlignJustify size={20} />
            </button>

            {/* Unset Text Align */}
            <button
                onClick={() => editor.chain().focus().unsetTextAlign().run()}
                className="p-2 rounded border hover:bg-gray-100"
                title="Unset Text Align"
                aria-label="Unset Text Align"
            >
                <BiText size={20} />
            </button>

            {/* Toggle Heading 1 */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded border ${editor.isActive({ heading: { level: 1 } }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'
                    }`}
                title="Toggle Heading 1"
                aria-label="Toggle Heading 1"
            >
                <span className="ml-1 font-bold">H1</span>
            </button>

            {/* Toggle Heading 2 */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded border ${editor.isActive({ heading: { level: 2 } }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'
                    }`}
                title="Toggle Heading 2"
                aria-label="Toggle Heading 2"
            >
                <span className="ml-1 font-bold">H2</span>
            </button>
        </div>
    )
}
