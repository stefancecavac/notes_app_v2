import { BlockData } from "../../../types";

import EditorJS from "@editorjs/editorjs";

type TextBlockComponentProps = {
  block: BlockData;
};

export const TextBlockComponent = ({ block }: TextBlockComponentProps) => {
  return <RichTextRenderer block={block} />;
};

const RichTextRenderer = ({ block }: { block: BlockData }) => {
  const editor = new EditorJS({
    /**
     * Id of Element that should contain Editor instance
     */
    holder: "editorjs",
  });

  return <div id="editorjs" />;
};
