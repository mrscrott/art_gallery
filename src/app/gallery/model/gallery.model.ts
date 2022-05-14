import { Config, Pagination } from 'src/app/shared/shared.model';

// just clone some of dto from api doc.
export class ImageDto {
    alt_artist_ids: any[] = [];
    alt_classification_ids: string[] = [];
    alt_image_ids: any[] = [];
    alt_material_ids: any[] = [];
    alt_style_ids: any[] = [];
    alt_subject_ids: string[] = [];
    alt_technique_ids: string[] = [];
    alt_titles: any;
    api_link: string = '';
    api_model: string = '';
    artist_display: string = '';
    artist_id: number | null = null;
    artist_ids: number[] = [];
    artist_title: string[] = [];
    artist_titles: string[] = [];
    artwork_catalogue_ids: any[] = [];
    artwork_type_id: number | null = null;
    artwork_type_title: string = '';
    boost_rank: any;
    category_ids: string[] = [];
    category_titles: string[] = [];
    classification_id: string = '';
    classification_ids: string[] = [];
    classification_title: string = '';
    classification_titles: string[] = [];
    color: Color = new Color();
    colorfulness: number | null = null;
    copyright_notice: any;
    credit_line: string = '';
    date_display: string = '';
    date_end: number | null = null;
    date_qualifier_id: any;
    date_qualifier_title: string = '';
    date_start: number | null = null;
    department_id: string = '';
    department_title: string = '';
    dimensions: string = '';
    document_ids: string[] = [];
    exhibition_history: string = '';
    fiscal_year: number | null = null;
    fiscal_year_deaccession: any;
    gallery_id: any;
    gallery_title: any;
    has_educational_resources: boolean = false;
    has_multimedia_resources: boolean = false;
    has_not_been_viewed_much: boolean = false;
    id: number | null = null;
    image_id: string = '';
    inscriptions: string = '';
    internal_department_id: number | null = null;
    is_boosted: boolean = false;
    is_on_view: boolean = false;
    is_public_domain: boolean = false;
    is_zoomable: boolean = false;
    last_updated: string = '';
    last_updated_source: string = '';
    latitude: number | null = null;
    latlon: string = '';
    longitude: number | null = null;
    main_reference_number: string = '';
    material_id: string = '';
    material_ids: string[] = [];
    material_titles: string[] = [];
    max_zoom_window_size: number | null = null;
    medium_display: string = '';
    on_loan_display: string = '';
    place_of_origin: string = '';
    provenance_text: string = '';
    publication_history: string = '';
    publishing_verification_level: string = '';
    section_ids: number[] = [];
    section_titles: string[] = [];
    site_ids: any[] = [];
    sound_ids: string[] = [];
    style_id: string = '';
    style_ids: string[] = [];
    style_title: string[] = [];
    style_titles: string[] = [];
    subject_id: string = '';
    subject_ids: string[] = [];
    subject_titles: string[] = [];
    suggest_autocomplete_all: string[] = [];
    suggest_autocomplete_boosted: string = '';
    technique_id: string = '';
    technique_ids: string[] = [];
    technique_titles: string[] = [];
    term_titles: string[] = [];
    text_ids: string[] = [];
    theme_titles: any[] = [];
    thumbnail: Thumbnail = new Thumbnail();
    timestamp: string = '';
    title: string = '';
    video_ids: any[] = [];
}
export class AgImage extends ImageDto {
    description?: string = '';
    displayMaterial?: string = '';
    constructor() {
        super();
    }
    static setDisplayMaterial(materials: string[]): string {
        let display = '';

        materials.forEach((material, i) => {
            if (i === materials.length - 1) {
                //is last
                if (materials.length === 1) {
                    display += `${material}`;
                } else {
                    display += ` and ${material}`;
                }
            } else if (i === materials.length - 2) {
                display += `${material}`;
            } else {
                display += `${material}, `;
            }
        });
        return display;
    }
    static setDescription(
        place: string,
        dateStart: number | null,
        dateEnd: number | null
    ): string {
        // for pure function
        let description = `${place ?? 'Unknown'}`; // Don't see req for no place , so just handle it
        if (dateStart && dateEnd) {
            if (dateStart === dateEnd) {
                description = `${place} (${dateStart})`;
            } else {
                description = `${place} (${dateStart} - ${dateEnd})`;
            }
        }
        // if (dateStart || dateEnd) { // we can use OR Operation for this to handle if we want to display if we have only 1 date available
        //     if (dateStart === dateEnd) {
        //         description = `${place} (${dateStart})`;
        //
        //     } else {
        // description = `${place} (${
        //             dateStart || 'Unknown'
        //         } - ${dateEnd || 'Unknown'} )`;
        //     }
        // }
        return description;
    }
    // static setDescription(image: AgImage) {
    //     // if want more easy way and quick
    //     let description = `${image.place_of_origin ?? 'Unknown'}`;
    //     if (image.date_start && image.date_end) {
    //         if (image.date_start === image.date_end) {
    //             description = `${image.place_of_origin} (${image.date_start} - ${image.date_end} )`;
    //         } else {
    //             description = `${image.place_of_origin} (${image.date_start})`;
    //         }
    //     }
    //     // if (image.date_start || image.date_end) { we can use OR Operation for this to handle if we want to display if we have only 1 date available
    //     //     if (image.date_start === image.date_end) {
    //     //         description = `${image.place_of_origin} (${image.date_start})`;
    //     //
    //     //     } else {
    // description = `${image.place_of_origin} (${
    //     //             image.date_start || 'Unknown'
    //     //         } - ${image.date_end || 'Unknown'} )`;
    //     //     }
    //     return description;
    // }
}
export class Thumbnail {
    alt_text: string = '';
    height: number = 0;
    lqip: string = '';
    width: number = 0;
}

export class Color {
    h: number = 0;
    l: number | null = null;
    s: number | null = null;
    percentage: number | null = null;
    population: number | null = null;
}
export interface Info {
    license_links: string[];
    license_text: string;
    version: string;
}
export interface GetImagesResponse {
    config: Config;
    data: ImageDto[];
    info: Info;
    pagination: Pagination; // for common class name I usually use Prefix Like AgPagination
}
export interface GetImagesRequest {
    limit: number;
    page: number;
    sort: string;
}
export interface GallerySearchParam {
    sort: string;
    filter: string;
}
