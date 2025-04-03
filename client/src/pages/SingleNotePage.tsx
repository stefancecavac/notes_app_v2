import { useCreateBlock } from "../api/blocksApi";
import { useGetSingleNote } from "../api/notesApi";
import BlockComponent from "../components/SingleNotePageComponents/BlockComponents";
import { HeaderComponent } from "../components/SingleNotePageComponents/HeaderComponent";

export const SingleNotePage = () => {
  const { note, noteLoading } = useGetSingleNote();
  const { createBlock } = useCreateBlock();

  if (noteLoading) return null;

  return (
    <div className=" w-full h-full ">
      <HeaderComponent />
      <button className="btn" onClick={() => createBlock({ noteId: note!.id, type: "text", properties: { title: "hello" } })}>
        add block
      </button>

      <div className="flex flex-col overflow-auto w-full h-full pt-20 pl-60 pr-20">
        <p className="text-4xl text-primary-content font-bold">{note?.noteTitle}</p>

        <div className="flex flex-col mt-20">
          {note?.blocks.map((block) => (
            <BlockComponent block={block} />
          ))}
        </div>
      </div>
    </div>
  );
};
