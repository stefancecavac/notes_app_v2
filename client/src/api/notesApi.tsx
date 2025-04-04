import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/ApiClient";
import { useParams } from "react-router-dom";
import { NoteData, UpdateBlockData, UpdateNoteData } from "../types";

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

export const useUpdateNote = () => {
  const { noteId } = useParams();
  const updateNoteApi = async ({ noteTitle, blocks, id }: UpdateNoteData) => {
    const response = await axiosInstance.patch(`/notes/update`, { noteTitle, blocks, id });
    return response.data as NoteData;
  };

  const { mutate: updateNote } = useMutation({
    mutationKey: ["note", noteId],
    mutationFn: updateNoteApi,
  });

  return { updateNote };
};
