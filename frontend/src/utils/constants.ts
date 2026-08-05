export const API_BASE_URL = String(
  import.meta.env.VITE_API_URL ?? "http://localhost:8000",
).replace(/\/$/, "");

export function getShortUrl(shortCode: string): string {
  return `${API_BASE_URL}/urls/${shortCode}`;
}
