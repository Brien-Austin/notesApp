import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/tokens";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | object;
  token?: string;
  retry?: boolean;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, token, retry = false } = options;

  const jwt = token ?? getAccessToken() ?? undefined;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(jwt && { Authorization: `Bearer ${jwt}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const url = `${BASE_URL}${endpoint}`;
  console.log(`Making ${method} request to: ${url}`);
  if (body) console.log("Request body:", JSON.stringify(body, null, 2));

  const response = await fetch(url, fetchOptions);

  if (response.status === 401 && !retry) {
    console.warn("Access token expired. Attempting refresh...");

    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiRequest<T>(endpoint, {
        ...options,
        retry: true,
        token: getAccessToken() ?? undefined,
      });
    } else {
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`API Error (${response.status}):`, errorData);
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.error("No refresh token available.");
    clearTokens();
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.error("Refresh token request failed:", response.status);
      clearTokens();
      return false;
    }

    const data = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = data;

    if (!accessToken || !newRefreshToken) {
      throw new Error("Invalid token response");
    }

    setAccessToken(accessToken);
    setRefreshToken(newRefreshToken);
    return true;
  } catch (err) {
    console.error("Token refresh failed:", err);
    clearTokens();
    return false;
  }
}
