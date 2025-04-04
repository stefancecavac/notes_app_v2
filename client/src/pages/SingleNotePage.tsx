import { useEffect, useRef } from "react";
import { useGetSingleNote, useUpdateNote } from "../api/notesApi";
import { HeaderComponent } from "../components/SingleNotePageComponents/HeaderComponent";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";

export const SingleNotePage = () => {
  const { note, noteLoading } = useGetSingleNote();
  const editorRef = useRef<EditorJS>(null);

  const { updateNote } = useUpdateNote();

  useEffect(() => {
    if (note && !editorRef.current && !noteLoading) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        inlineToolbar: true,
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
              preserveBlank: true,
            },
          },
          header: {
            class: Header,
            inlineToolbar: ["link", "bold", "italic"],
            levels: [1, 2, 3],
            defaultLevel: 1,
          },

          list: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
        placeholder: "Start typing",
        data: {
          time: 0,
          version: "",
          blocks: note?.blocks?.map((block) => block),
        },
        onChange: () => {},
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [note, noteLoading]);

  const handleSave = () => {
    if (editorRef.current) {
      editorRef.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData.blocks);
          updateNote({ blocks: outputData.blocks, id: note.id, noteTitle: note?.noteTitle });
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };

  if (noteLoading) return null;

  return (
    <div className="w-full h-full">
      <HeaderComponent />
      <div className="flex justify-between items-center">
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>

      <div className="flex flex-col overflow-auto w-full h-full px-50 ">
        <div id="editorjs" className=" mt-20">
          <h1 className="text-4xl text-base-content font-bold ml-60  ">{note?.noteTitle}</h1>
        </div>
      </div>
    </div>
  );
};
