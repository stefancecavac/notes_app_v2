import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/ApiClient";
import { useParams } from "react-router-dom";
import { NoteData } from "../types";

export const useGetAllNotes = () => {
  const getAllNotesApi = async () => {
    const response = await axiosInstance.get("/notes/");
    return response.data;
  };

  const { data: notes, isFetching: notesLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotesApi,
  });

  return { notes, notesLoading };
};

export const useGetSingleNote = () => {
  const { noteId } = useParams();
  const getSingleNoteApi = async () => {
    const response = await axiosInstance.get(`/notes/${noteId}`);
    return response.data as NoteData;
  };

  const { data: note, isFetching: noteLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: getSingleNoteApi,
  });

  return { note, noteLoading };
};
