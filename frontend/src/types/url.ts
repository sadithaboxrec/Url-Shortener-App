export interface CreateUrlRequest {
    original_url: string;
}

export interface UrlResponse {
    id: number;
    short_code: string;
    original_url: string;
    created_at: string;
}