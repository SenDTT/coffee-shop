'use client';

import { AdminFormFieldWithValue } from '../../types/Product'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { useEffect, useMemo, useState } from 'react'
import { FaList, FaListOl, FaRedo, FaRegImage, FaUndo } from 'react-icons/fa';
import { TbBlockquote } from 'react-icons/tb';
import { MdHorizontalRule, MdOutlineFormatBold, MdOutlineFormatItalic, MdOutlineFormatStrikethrough, MdOutlineFormatUnderlined } from 'react-icons/md';
import api from '../../api';
import { StyledHeading } from '../extensions/StyleHeading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import TextAlignButtons from '../extensions/TextAlignButton';

const COLORS = [
    { hex: '#000000', name: 'black' },
    { hex: '#FFFFFF', name: 'white' },
    { hex: '#FF0000', name: 'red' },
    { hex: '#FFA500', name: 'orange' },
    { hex: '#FFFF00', name: 'yellow' },
    { hex: '#008000', name: 'green' },
    { hex: '#00FFFF', name: 'cyan' },
    { hex: '#0000FF', name: 'blue' },
    { hex: '#800080', name: 'purple' },
    { hex: '#FFC0CB', name: 'pink' },
    { hex: '#A52A2A', name: 'brown' },
    { hex: '#808080', name: 'gray' },
    { hex: '#ADD8E6', name: 'lightblue' },
    { hex: '#F0E68C', name: 'khaki' },
    { hex: '#D3D3D3', name: 'lightgray' },
]

export default function BlogEditor(props: AdminFormFieldWithValue) {
    const [mounted, setMounted] = useState(false);
    const [currentColor, setCurrentColor] = useState<string | null>(null);
    const [content, setContent] = useState<string>(props.value as string || '');

    useEffect(() => {
        setMounted(true);
    }, []);

    const extensions = useMemo(() => [
        StarterKit.configure({
            bold: {
                HTMLAttributes: {
                    class: 'font-bold',
                },
            },
            italic: {
                HTMLAttributes: {
                    class: 'italic',
                },
            },
            strike: {
                HTMLAttributes: {
                    class: 'line-through',
                },
            },
            blockquote: {
                HTMLAttributes: {
                    class: 'border-l-4 border-gray-300 pl-4 italic text-gray-600',
                },
            },
            dropcursor: false,
            heading: false,
            bulletList: false,
            orderedList: false,
            horizontalRule: false,
        }),
        StyledHeading.configure({
            levels: [1, 2, 3, 4, 5, 6],
        }),
        BulletList.configure({
            HTMLAttributes: {
                class: 'list-disc pl-4 marker:text-gray-500', // customize as needed
            },
        }),
        OrderedList.configure({
            HTMLAttributes: {
                class: 'list-decimal pl-4 marker:text-gray-500', // or Tailwind style you prefer
            },
        }),
        Image.configure({
            inline: false,
        }),
        Underline,
        Dropcursor.configure({
            color: '#000',
            width: 2,
        }),
        HorizontalRule.configure({
            HTMLAttributes: {
                class: 'border-t border-gray-300 my-2',
            },
        }),
        Color,
        TextStyle,
        FontFamily.configure({
            types: ['textStyle', 'heading'],
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
    ], []);

    const editor = useEditor({
        extensions,
        content: content,
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 w-full text-base cursor-text border-none outline-none',
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            if (html !== props.value) {
                setContent(html);
            }
        },
        immediatelyRender: false,
    }, []);

    useEffect(() => {
        if (content && props.onBeforeSubmitHanlde) {
            props.onBeforeSubmitHanlde(content as string)
        }
    }, [content]);

    useEffect(() => {
        if (editor && props.value !== editor.getHTML()) {
            editor.commands.setContent(props.value as string || '')
        }
    }, [props.value, editor]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const res = await api.post('/admin/upload', formData);

        const data = res.data;
        if (!data.success) {
            props.error = 'Failed to upload image';
            return;
        }

        const imageUrl = data.data.url;

        if (imageUrl) {
            editor?.chain().focus().setImage({ src: process.env.NEXT_PUBLIC_DOMAIN + imageUrl }).run();
        }
    };

    if (!mounted || typeof window === 'undefined' || !editor) return null;

    return (
        <div className="w-full flex flex-col">
            {/* Sidebar Toolbar */}
            <div className="flex flex-row flex-wrap gap-2 p-4 border rounded-t-md bg-slate-50 shadow-sm text-sm w-full sm:w-auto">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBold().run()
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('bold') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Bold"
                    aria-label="Bold"
                >
                    <MdOutlineFormatBold className="inline-block size-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('italic') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Italic"
                    aria-label="Italic"
                >
                    <MdOutlineFormatItalic className="inline-bloc size-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleUnderline().run()
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('underline') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Underline"
                    aria-label="Underline"
                >
                    <MdOutlineFormatUnderlined className="inline-block size-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('strike') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Strike"
                    aria-label="Strike"
                >
                    <MdOutlineFormatStrikethrough className="inline-block size-5" />
                </button>
                <select
                    className={`border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer ${currentColor ? `bg-${currentColor}-500` : ''}`}
                    onChange={(e) => {
                        e.preventDefault();
                        const color = e.target.value;
                        const colorName = COLORS.find(c => c.hex === color)?.name || '';
                        setCurrentColor(colorName);
                        editor.chain().focus().setColor(color).run()
                    }}
                    defaultValue=""
                    aria-label="Heading Color Selector"
                >
                    <option value="">Colors</option>
                    {COLORS.map((color) => (
                        <option
                            key={color.hex}
                            value={color.hex}
                        >
                            {color.name}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => {
                        e.preventDefault();
                        const level = parseInt(e.target.value);
                        if (!isNaN(level)) {
                            editor?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
                        }
                    }}
                    value={
                        [1, 2, 3, 4, 5, 6].find((lvl) => editor?.isActive('heading', { level: lvl })) ?? ''
                    }
                    className="px-2 py-1 rounded border text-sm"
                    aria-label="Heading Level Selector"
                >
                    <option value="">Normal Text</option>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                    <option value="5">Heading 5</option>
                    <option value="6">Heading 6</option>
                </select>
                <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => {
                        e.preventDefault();
                        const fontFamily = e.target.value;
                        if (fontFamily) {
                            editor.chain().focus().setFontFamily(fontFamily).run();
                        } else {
                            editor.chain().focus().unsetFontFamily().run();
                        }
                    }}
                    defaultValue=""
                    aria-label="Font Family Selector"
                >
                    <option value="">Select Font</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
                <TextAlignButtons editor={editor} />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().setHorizontalRule().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('bulletList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="List"
                    aria-label="List"
                >
                    <MdHorizontalRule className="inline-block size-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBlockquote().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('blockquote') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Blockquote"
                    aria-label="Blockquote"
                >
                    <TbBlockquote className="inline-block size-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('bulletList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="List"
                    aria-label="List"
                >
                    <FaList className="inline-block size-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('orderedList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="List OL"
                    aria-label="List OL"
                >
                    <FaListOl className="inline-block size-5" />
                </button>
                <label htmlFor="image-upload" className="cursor-pointer px-2 py-2 border rounded hover:bg-gray-200">
                    <FaRegImage className="inline-block w-5 h-5" />
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    title="Upload image"
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('orderedList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Undo"
                    aria-label="Undo"
                >
                    <FaUndo className="inline-block " />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        editor.chain().focus().redo().run();
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('orderedList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Redo"
                    aria-label="Redo"
                >
                    <FaRedo className="inline-block " />
                </button>
            </div>

            {/* Editor Area */}
            <div className="w-full flex flex-col gap-2">

                <div className="border border-gray-300 rounded-b-md bg-white">
                    <EditorContent editor={editor} />
                </div>

                {props.error && <p className="text-red-500 text-sm">{props.error}</p>}
                {props.success && <p className="text-green-500 text-sm">{props.success}</p>}
            </div>
        </div>
    )
}
