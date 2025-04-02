import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/ApiClient";
import { BlockData, UpdateBlockData } from "../types";

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
