import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../api/urls";
import type {
    CreateUrlRequest,
    UrlResponse,
} from "../types/url";

export function useCreateUrl() {
    const queryClient = useQueryClient();

    return useMutation<
        UrlResponse,
        Error,
        CreateUrlRequest
    >({
        mutationFn: createShortUrl,

        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["user-urls"] });
        },
    });
}
