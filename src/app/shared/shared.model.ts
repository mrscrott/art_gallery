export interface Pagination {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
}
export interface Config {
    iiif_url: string;
    website_url: string;
}
export interface DefaultDdl<T, Y> {
    id: T;
    value: Y;
    label: string;
}
