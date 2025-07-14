import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/api";
import {
  GET_NOTES,
  POST_NOTE,
  FAVOURITE_NOTE,
  DELETE_NOTE,
  GET_TAGS,
} from "@/app/api/api_constants";

export type Tag = {
  _id: string;
  name: string;
};

export type Note = {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  createdAt: string;
  isFavorite?: boolean;
};
type UpdateNotePayload = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};

export function useTags() {
  return useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: () => apiRequest<Tag[]>(GET_TAGS),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateNotePayload) => {
      const url = `${POST_NOTE}/${data.id}`;
      return apiRequest<Note>(url, {
        method: "PUT",
        body: {
          title: data.title,
          content: data.content,
          tags: data.tags,
        },
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
    },
  });
}

export function useNotes(q?: string, tags?: string[]) {
  const queryParams = new URLSearchParams();
  if (q) queryParams.append("q", q);
  if (tags && tags.length > 0) queryParams.append("tags", tags.join(","));

  const queryStr = queryParams.toString();
  const url = `${GET_NOTES}${queryStr ? "?" + queryStr : ""}`;

  return useQuery<Note[]>({
    queryKey: ["notes", q, tags],
    queryFn: () => apiRequest<Note[]>(url),
  });
}

export function useNoteById(id: string, enabled: boolean = true) {
  return useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => apiRequest<Note>(`${GET_NOTES}/${id}`),
    enabled: !!id && enabled,
  });
}

type DeleteNotePayload = {
  id: string;
};

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteNotePayload) => {
      const url = `${DELETE_NOTE}/${id}`;
      return apiRequest<void>(url, {
        method: "DELETE",
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
    },
  });
}

type CreateNotePayload = {
  title: string;
  content: string;
  tags: string[];
};

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotePayload) =>
      apiRequest<Note>(POST_NOTE, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

type FavoriteNotePayload = {
  id: string;
};

export function useFavoriteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FavoriteNotePayload) => {
      const url = `${FAVOURITE_NOTE}/${data.id}`;
      console.log("Favorite note request URL:", url);
      return apiRequest<Note>(url, {
        method: "POST",
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
    },
  });
}
