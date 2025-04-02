import { useGetSingleNote } from "../api/notesApi";
import BlockComponent from "../components/SingleNotePageComponents/BlockComponents";

export const SingleNotePage = () => {
  const { note, noteLoading } = useGetSingleNote();
  return (
    <div className="m-10 mx-50">
      <p className="text-4xl text-primary-content font-bold">{note?.noteTitle}</p>

      <div className="flex flex-col mt-20">
        {note?.blocks.map((block) => (
          <BlockComponent block={block} />
        ))}
      </div>
    </div>
  );
};
