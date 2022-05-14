import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AgImage, GetImagesResponse, ImageDto } from './model/gallery.model';
import { GalleryService } from './service/gallery.service';
import { environment } from 'src/environments/environment';
import { DefaultDdl } from '../shared/shared.model';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

@Component({
    selector: 'ag-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    @ViewChild('template') templateRef!: TemplateRef<any>;
    templateDialogRef!: NxModalRef<any>;

    images: AgImage[] = [];
    currentimages: AgImage[] = [];
    title = 'ART COLLECTION';
    iifLink = 'https://www.artic.edu/iiif/2';
    imagePostFix = environment.imagePostFixPath;
    fallBackImagePath = environment.blankImagePath;
    filters: DefaultDdl<string, string>[] = [];
    sorts: DefaultDdl<string, string>[] = [
        {
            id: 'Name',
            label: 'Name',
            value: 'title'
        },
        {
            id: 'Artist',
            label: 'Artist',
            value: 'artist_title'
        },
        {
            id: 'Date',
            label: 'Date',
            value: 'date_start'
        }
    ];
    galleryForm = new FormGroup({
        sort: new FormControl('title'),
        filter: new FormControl([])
    });
    searchSubject$ = new Subject();
    count: number = 0;
    page: number = 1;
    perPage: number = 20;

    constructor(
        private galleryService: GalleryService,
        public dialogService: NxDialogService,
        private dir: Directionality
    ) {}

    ngOnInit(): void {
        this.galleryForm.get('sort')?.valueChanges.subscribe((data) => {
            this.searchSubject$.next(true);
        });
        this.galleryForm.get('filter')?.valueChanges.subscribe((data: string[]) => {
            if (data.length > 0) {
                this.currentimages = this.images.filter((image) =>
                    image.style_titles.some((style) => data.indexOf(style) >= 0)
                );
            } else {
                this.currentimages = this.images;
            }
        });
        this.searchSubject$.pipe(debounceTime(300)).subscribe((data) => {
            this.openFromTemplate();
            this.galleryService
                .getImages({
                    sort: this.galleryForm.get('sort')?.value ?? '',
                    limit: this.perPage,
                    page: this.page
                })
                .subscribe({
                    next: (res: GetImagesResponse) => {
                        this.galleryForm.get('filter')?.setValue([]);
                        this.count = res.pagination.total;
                        this.iifLink = res.config.iiif_url;
                        const tempFilters: any = {};
                        this.filters = [];
                        this.images = res.data?.map((item, i) => {
                            const image: AgImage = item;
                            // if (i == 2) {
                            //     image.image_id = 'test failed'; // this is for stimulate fail image
                            // }
                            image.description = AgImage.setDescription(
                                item.place_of_origin,
                                item.date_start,
                                item.date_end
                            );
                            image.displayMaterial = AgImage.setDisplayMaterial(
                                item.material_titles ?? []
                            );
                            item.style_titles.forEach((title) => {
                                if (tempFilters[title]) {
                                    tempFilters[title] += 1;
                                } else {
                                    tempFilters[title] = 1;
                                }
                            });
                            return image;
                        });
                        this.currentimages = JSON.parse(JSON.stringify(this.images));
                        for (const key in tempFilters) {
                            if (Object.prototype.hasOwnProperty.call(tempFilters, key)) {
                                const count = tempFilters[key];
                                this.filters.push({
                                    id: key,
                                    value: key,
                                    label: `${key} (${count})`
                                });
                            }
                        }
                    },
                    error: (err) => {
                        console.log(err);
                    },
                    complete: () => {
                        // setTimeout(() => { // use this or network throttling to stimute slow connection
                        //     this.closeTemplateDialog();
                        // }, 5000);
                        this.closeTemplateDialog();
                    }
                });
        });
        this.searchSubject$.next(true);
    }
    errorImage(event: any) {
        event.target.src = this.fallBackImagePath;
    }
    selectLabel(option: DefaultDdl<string, string>): string {
        return option.label;
    }

    selectValue(option: DefaultDdl<string, string>): string {
        return option.value;
    }

    prevPage() {
        this.page--;
        this.searchSubject$.next(true);
    }

    nextPage() {
        this.page++;
        this.searchSubject$.next(true);
    }

    goToPage(n: number) {
        this.page = n;
        this.searchSubject$.next(true);
    }

    openFromTemplate(): void {
        this.templateDialogRef = this.dialogService.open(this.templateRef, {
            direction: this.dir.value,
            disableClose: true,
            id: 'ag__modal--spinner'
        });
    }

    closeTemplateDialog() {
        this.templateDialogRef.close();
    }
}
