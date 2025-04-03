import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/ApiClient";
import { BlockData, CreateBlockData, NoteData, UpdateBlockData } from "../types";
import { useParams } from "react-router-dom";

export const useCreateBlock = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();

  const createBlockApi = async (data: CreateBlockData) => {
    const response = await axiosInstance.post(`/notes/block/`, data);
    return response.data as BlockData;
  };

  const { mutate: createBlock } = useMutation({
    mutationKey: ["block"],
    mutationFn: createBlockApi,
    onSuccess: (data: BlockData) => {
      queryClient.setQueryData(["note", noteId], (oldData: NoteData) => {
        if (!oldData) return oldData;
        return { ...oldData, blocks: [...oldData.blocks, data] };
      });
    },
  });

  return { createBlock };
};

export const useUpdateBlock = () => {
  const updateBlockApi = async (data: UpdateBlockData) => {
    const response = await axiosInstance.patch(`/notes/block/update`, data);
    return response.data as BlockData;
  };

  const { mutate: updateBlock } = useMutation({
    mutationKey: ["block"],
    mutationFn: updateBlockApi,
  });

  return { updateBlock };
};

export const useDeleteBlock = () => {
  const queryClient = useQueryClient();
  const { noteId } = useParams();

  const deleteBlockApi = async (id: string) => {
    const response = await axiosInstance.delete(`/notes/block/`, { data: { id } });
    console.log("data", response.data);

    return response.data as BlockData;
  };

  const { mutate: deleteBlock } = useMutation({
    mutationKey: ["block"],
    mutationFn: deleteBlockApi,
    onSuccess: (data: BlockData) => {
      queryClient.setQueryData(["note", noteId], (oldData: NoteData) => {
        if (!oldData) return oldData;

        const updatedBlocks = oldData.blocks.filter((block) => block.id !== data.id);

        return { ...oldData, blocks: updatedBlocks };
      });
    },
  });
  console.log(queryClient.getQueryData(["note", noteId]));

  return { deleteBlock };
};
