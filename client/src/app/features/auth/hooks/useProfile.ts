import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/api/api";
import { GET_PROFILE } from "@/app/api/api_constants";
import { ProfileResponse } from "@/app/types/types";

export function useProfile() {
  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: () => apiRequest<ProfileResponse>(GET_PROFILE),
    staleTime: 5 * 60 * 1000,
  });
}
