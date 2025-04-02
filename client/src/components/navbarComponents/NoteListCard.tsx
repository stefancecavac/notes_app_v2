import { NavLink } from "react-router-dom";
import { NotesData } from "../../types";

type noteListCardProps = {
  note: NotesData;
};

export const NoteListCard = ({ note }: noteListCardProps) => {
  if (!note) {
    return null;
  }

  return (
    <div>
      <NavLink
        to={`/${note.id}`}
        className={({ isActive }) =>
          ` relative transition-all  mb-1 text-xs    items-center font-medium  p-0.5 border border-transparent flex group  gap-2 rounded-md group hover:cursor-pointer hover:bg-base-100 ${
            isActive ? `bg-base-100/50 font-bold  text-base-content ` : "text-base-content/50"
          }`
        }
      >
        <div className="size-5 flex items-center relative">
          {/* <button
            className="btn btn-xs btn-square btn-ghost opacity-0 absolute group-hover:opacity-100 transition-all p-0.5 rounded-md hover:bg-neutral"
            onClick={() => toggleTreeView(note.id)}
          >
            {treeViewState[note.id] ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 opacity-0 group-hover:opacity-100 transition-all "
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 opacity-0 group-hover:opacity-100 transition-all"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            )}
          </button> */}
        </div>

        <p className=" truncate flex-1  py-1  ">{note?.noteTitle || "Empty note"} </p>

        <div className="relative shrink-0 flex items-center">
          <button
            className={`
            bg-inherit shrink-0 relative rounded-md transition-all hover:bg-base-200 link p-0`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </div>
      </NavLink>
    </div>
  );
};
