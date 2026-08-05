export interface CreateUrlRequest {
    original_url: string;
}

export interface UrlResponse {
    id: number;
    short_code: string;
    original_url: string;
    created_at: string;
}

export interface UserUrl extends UrlResponse {
    click_count: number;
}
