'use client';

import { AdminFormFieldWithValue } from '../../types/Product'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import { useEffect, useMemo, useState } from 'react'
import { FaList, FaListOl, FaRedo, FaRegImage, FaUndo } from 'react-icons/fa';
import { TbBlockquote } from 'react-icons/tb';
import { MdOutlineFormatBold, MdOutlineFormatItalic, MdOutlineFormatStrikethrough, MdOutlineFormatUnderlined } from 'react-icons/md';
import api from '../../api';

export default function BlogEditor(props: AdminFormFieldWithValue) {
    const [mounted, setMounted] = useState(false);

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
            bulletList: {
                HTMLAttributes: {
                    class: 'list-disc list-inside',
                },
            },
            heading: {
                levels: [1, 2, 3, 4, 5, 6],
            },
            orderedList: {
                HTMLAttributes: {
                    class: 'list-decimal list-inside',
                },
            },
            listItem: {
                HTMLAttributes: {
                    class: 'mb-2',
                },
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
    ], []);


    const editor = useEditor({
        extensions,
        content: props.value as string,
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 w-full text-base cursor-text border-none outline-none',
            },
        },
        onUpdate({ editor }) {
            props.onChange({
                target: {
                    name: props.name,
                    value: editor.getHTML(),
                },
            });
        },
    })

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
            editor?.chain().focus().setImage({ src: imageUrl }).run();
        }
    };

    if (!mounted || typeof window === 'undefined' || !editor) return null;

    return (
        <div className="w-full flex flex-col">
            {/* Sidebar Toolbar */}
            <div className="flex flex-row flex-wrap gap-2 p-4 border rounded-t-md bg-slate-50 shadow-sm text-sm w-full sm:w-auto">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('bold') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Bold"
                    aria-label="Bold"
                >
                    <MdOutlineFormatBold className="inline-block size-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('italic') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Italic"
                    aria-label="Italic"
                >
                    <MdOutlineFormatItalic className="inline-bloc size-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('underline') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Underline"
                    aria-label="Underline"
                >
                    <MdOutlineFormatUnderlined className="inline-block size-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('strike') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Strike"
                    aria-label="Strike"
                >
                    <MdOutlineFormatStrikethrough className="inline-block size-5" />
                </button>
                <button
                    onClick={() => {
                        if (editor?.can().chain().focus().toggleHeading({ level: 1 }).run()) {
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        }
                    }}
                    className={`px-2 py-1 rounded border ${editor.isActive('heading', { level: 1 }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="H1"
                    aria-label="H1"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('heading', { level: 2 }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="H2"
                    aria-label="H2"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('heading', { level: 3 }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="H3"
                    aria-label="H3"
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('heading', { level: 4 }) ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="H4"
                    aria-label="H4"
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('blockquote') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Blockquote"
                    aria-label="Blockquote"
                >
                    <TbBlockquote className="inline-block size-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('bulletList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="List"
                    aria-label="List"
                >
                    <FaList className="inline-block size-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('orderedList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="List OL"
                    aria-label="List OL"
                >
                    <FaListOl className="inline-block size-5" />
                </button>
                <label htmlFor="image-upload" className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-200">
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
                    onClick={() => editor.chain().focus().undo().run()}
                    className={`px-2 py-1 rounded border ${editor.isActive('orderedList') ? 'bg-coastal-light-text text-white' : 'hover:bg-gray-200'}`}
                    title="Undo"
                    aria-label="Undo"
                >
                    <FaUndo className="inline-block " />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
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
