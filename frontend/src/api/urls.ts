import type { CreateUrlRequest, UrlResponse } from "../types/url";
import api from "./client";

// export async function createShortUrl(originalUrl: string) {
//     const response = await api.post("/urls", {
//         original_url: originalUrl,
//     });

//     return response.data;
// }



export async function createShortUrl(
    request: CreateUrlRequest
): Promise<UrlResponse> {
    const { data } = await api.post("/urls", request);

    return data;
}