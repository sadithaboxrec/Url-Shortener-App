import { useMutation } from "@tanstack/react-query";
import { createShortUrl } from "../api/urls";
import type {
    CreateUrlRequest,
    UrlResponse,
} from "../types/url";

export function useCreateUrl() {
    return useMutation<
        UrlResponse,
        Error,
        CreateUrlRequest
    >({
        mutationFn: createShortUrl,

        onSuccess: (data) => {
            console.log("Short URL created:", data);
        },

        onError: (error) => {
            console.error("Failed to create URL:", error);
        },
    });
}