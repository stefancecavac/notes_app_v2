import { useState, useRef, useEffect } from "react";
import { BlockData } from "../../../types";
import { useDebounceHook } from "../../../hooks/useDebounceHook";
import { useCreateBlock, useDeleteBlock, useUpdateBlock } from "../../../api/blocksApi";

type TextBlockComponentProps = {
  block: BlockData;
};

export const TextBlockComponent = ({ block }: TextBlockComponentProps) => {
  return <RichTextRenderer block={block} />;
};

const RichTextRenderer = ({ block }: { block: BlockData }) => {
  const [text, setText] = useState(block.properties.title);
  const { updateBlock } = useUpdateBlock();
  const { deleteBlock } = useDeleteBlock();
  const defaultBgColor = getComputedStyle(document.documentElement).getPropertyValue("--color-base-300").trim();
  const bgColors = ["#243d30", "#143a4e", "#3c2d49", "#4e2c3c", "#522e2a", "#564328", defaultBgColor];
  const { debouncedValue } = useDebounceHook({ value: text, delay: 1500 });
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const { createBlock } = useCreateBlock();

  useEffect(() => {
    if (debouncedValue !== block.properties.title) {
      updateBlock({ id: block.id, properties: { title: debouncedValue }, type: block.type });
    }
  }, [debouncedValue, block, updateBlock]);

  useEffect(() => {
    if (editorRef.current && block.properties.title) {
      editorRef.current.innerHTML = block.properties.title;
    }
  }, [block.properties.title]);

  const handleContentChange = () => {
    if (editorRef.current) {
      setText(editorRef.current.innerHTML);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const updateToolbarPosition = () => {
    const currentSelection = window.getSelection();

    if (currentSelection && currentSelection.toString().length > 0) {
      let isInEditor = false;
      let node = currentSelection.anchorNode;

      while (node) {
        if (node === editorRef.current) {
          isInEditor = true;
          break;
        }
        node = node.parentNode;
      }

      if (isInEditor) {
        const range = currentSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        const containerRect = containerRef.current?.getBoundingClientRect() || {
          left: 0,
          top: 0,
        };

        const relativeLeft = rect.left - containerRect.left + rect.width / 2;
        const relativeTop = rect.top - containerRect.top - 40;

        setToolbarPosition({
          left: relativeLeft,
          top: relativeTop + window.scrollY,
        });

        setShowToolbar(true);
      }
    } else {
      setShowToolbar(false);
    }
  };

  const handleMouseUp = () => {
    setTimeout(updateToolbarPosition, 0);
  };

  useEffect(() => {
    const handleDeleteBlock = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (editorRef.current && editorRef.current.textContent?.trim() === "") {
          deleteBlock(block.id);
        }
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keydown", handleDeleteBlock);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("keydown", handleDeleteBlock);
      }
    };
  }, [block.id, deleteBlock]);

  useEffect(() => {
    const handleCreateBlock = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        createBlock({ noteId: block.noteId, type: "text", properties: { title: "123" } });
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keydown", handleCreateBlock);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("keydown", handleCreateBlock);
      }
    };
  }, [block.id, block.noteId, createBlock]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node) &&
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setShowToolbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        data-placeholder="data- placeholder"
        ref={editorRef}
        contentEditable
        onClick={handleMouseUp}
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
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="absolute flex items-center gap-1 p-1 bg-white shadow-md rounded-md"
          style={{
            top: toolbarPosition.top,
            left: toolbarPosition.left,
            transform: "translateX(-50%)",
            zIndex: 100,
          }}
        >
          <button onClick={() => formatText("bold")} className="p-1 hover:bg-gray-100 rounded">
            <b>B</b>
          </button>
          <button onClick={() => formatText("italic")} className="p-1 hover:bg-gray-100 rounded">
            <i>I</i>
          </button>
          <button onClick={() => formatText("underline")} className="p-1 hover:bg-gray-100 rounded">
            <u>U</u>
          </button>

          {bgColors.map((bColor) => (
            <button
              onClick={() => formatText("backColor", bColor)}
              key={bColor}
              style={{ backgroundColor: bColor }}
              className="size-8 rounded btn btn-square"
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};
