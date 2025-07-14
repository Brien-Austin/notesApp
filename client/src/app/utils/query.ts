export function buildQueryURL(
  baseUrl: string,
  params: { [key: string]: any } = {}
) {
  const queryParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length > 0) queryParams.append(key, value.join(","));
    } else if (typeof value === "string" && value.trim()) {
      queryParams.append(key, value);
    }
  }

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
