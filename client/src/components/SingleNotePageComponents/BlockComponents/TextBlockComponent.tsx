import { useState, useRef, useEffect } from "react";
import { BlockData } from "../../../types";
import { useDebounceHook } from "../../../hooks/useDebounceHook";
import { useUpdateBlock } from "../../../api/blocksApi";

type TextBlockComponentProps = {
  block: BlockData;
};

export const TextBlockComponent = ({ block }: TextBlockComponentProps) => {
  return <RichTextRenderer block={block} />;
};

const RichTextRenderer = ({ block }: { block: BlockData }) => {
  const [text, setText] = useState(block.properties.title);
  const { updateBlock } = useUpdateBlock();

  const { debouncedValue } = useDebounceHook({ value: text, delay: 1500 });
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedValue !== block.properties.title) {
      updateBlock({ id: block.id, properties: { title: debouncedValue }, type: block.type });
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = block.properties.title;
    }
  }, [block.properties.title]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setText(newHtml);
    }
  };

  const applyBlueText = () => {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);

    const span = document.createElement("span");
    span.style.color = "blue";
    span.appendChild(range.extractContents());
    range.insertNode(span);
    handleContentChange();
  };

  return (
    <div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          outline: "none",
          cursor: "text",
          minHeight: "1.5em",
          padding: "4px",
          borderRadius: "30px",
        }}
      />
      <div style={{ marginTop: "8px" }}>
        <button className="btn" onClick={applyBlueText}>
          Blue Text
        </button>
      </div>
    </div>
  );
};
