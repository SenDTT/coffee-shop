import { Heading as TiptapHeading } from "@tiptap/extension-heading";

export const StyledHeading = TiptapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const tag = `h${level}`;
    const classMap: Record<number, string> = {
      1: "text-4xl font-bold mt-6 mb-4",
      2: "text-3xl font-semibold mt-5 mb-3",
      3: "text-2xl font-medium mt-4 mb-2",
      4: "text-xl mt-3 mb-2",
      5: "text-lg mt-2 mb-1",
      6: "text-base mt-2 mb-1 text-gray-600",
    };

    return [tag, { ...HTMLAttributes, class: classMap[level] ?? "" }, 0];
  },
});
