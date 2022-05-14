import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetImagesRequest, GetImagesResponse, ImageDto } from '../model/gallery.model';

@Injectable({
    providedIn: 'root'
})
// in real life I separate api service from module service
export class GalleryService {
    constructor(private http: HttpClient) {}
    getImages(req: GetImagesRequest): Observable<GetImagesResponse> {
        // this api has a bug, if select page 1500 , limit 1
        return this.http.get<any>(
            `${
                environment.serverUrl
            }/artworks/search?query[term][is_public_domain]=true&fields=title,artist_title,date_start,date_end,place_of_origin,style_titles,subject_titles,material_titles,image_id&limit=${
                req.limit
            }&page=${req.page}&sort[${req.sort}${
                req.sort === 'date_start' ? '' : '.keyword'
            }]=asc`
        );
    }
}
