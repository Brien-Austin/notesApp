import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/api";
import {
  GET_BOOKMARKS,
  POST_BOOKMARKS,
  FAVOURITE_BOOKMARK,
} from "@/app/api/api_constants";

export type Tag = {
  _id: string;
  name: string;
};
type UpdateBookmarkPayload = {
  id: string;
  url?: string;
  title?: string;
  tags?: string[];
};

export function useUpdateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBookmarkPayload) => {
      return apiRequest<Bookmark>(`${POST_BOOKMARKS}/${data.id}`, {
        method: "PUT",
        body: data,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", variables.id] });
    },
  });
}

type DeleteBookmarkPayload = {
  id: string;
};

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteBookmarkPayload) => {
      return apiRequest<Bookmark>(`${POST_BOOKMARKS}/${data.id}`, {
        method: "DELETE",
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.removeQueries({ queryKey: ["bookmark", variables.id] });
    },
  });
}

export type Bookmark = {
  _id: string;
  url: string;
  title: string;
  tags: Tag[];
  createdAt: string;
  isFavorite?: boolean;
};

export function useBookmarks(q?: string, tags?: string[]) {
  const queryParams = new URLSearchParams();
  if (q) queryParams.append("q", q);
  if (tags && tags.length > 0) queryParams.append("tags", tags.join(","));

  const queryStr = queryParams.toString();
  const url = `${GET_BOOKMARKS}${queryStr ? "?" + queryStr : ""}`;

  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks", q, tags],
    queryFn: () => apiRequest<Bookmark[]>(url),
  });
}

export function useBookmarkById(id: string, enabled: boolean = true) {
  return useQuery<Bookmark>({
    queryKey: ["bookmark", id],
    queryFn: () => apiRequest<Bookmark>(`${GET_BOOKMARKS}/${id}`),
    enabled: !!id && enabled,
  });
}

type CreateBookmarkPayload = {
  url: string;
  title: string;
  tags: string[];
};

export function useCreateBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookmarkPayload) =>
      apiRequest<Bookmark>(POST_BOOKMARKS, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

type FavoriteBookmarkPayload = {
  id: string;
};

export function useFavoriteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FavoriteBookmarkPayload) => {
      const url = `${FAVOURITE_BOOKMARK}/${data.id}`;
      console.log("Favorite bookmark request URL:", url);
      return apiRequest<Bookmark>(url, {
        method: "POST",
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["bookmark", variables.id] });
    },
  });
}
