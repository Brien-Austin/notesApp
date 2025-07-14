import { apiRequest } from "@/app/api/api";
import { setAccessToken, setRefreshToken } from "@/app/utils/tokens";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await apiRequest<{ accessToken: string; refreshToken: string }>(
    "/auth/register",
    {
      method: "POST",
      body: data,
    }
  );
  setAccessToken(res.accessToken);
  setRefreshToken(res.refreshToken);

  return res;
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await apiRequest<{ accessToken: string; refreshToken: string }>(
    "/auth/login",
    {
      method: "POST",
      body: data,
    }
  );

  setAccessToken(res.accessToken);
  setRefreshToken(res.refreshToken);
  return res;
}
