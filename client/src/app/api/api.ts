export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | object;

  token?: string;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, token } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  const url = `${BASE_URL}${endpoint}`;
  console.log(`Making ${method} request to: ${url}`);
  console.log("Request body:", JSON.stringify(body, null, 2));
  console.log("Fetch options:", fetchOptions);

  const response = await fetch(url, fetchOptions);
  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`API Error (${response.status}):`, errorData);
    console.error("Full response:", response);
    throw new Error(
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}
