import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
// In real situation we use unit test on BE for api service testing. From my experience I only test on connection.
describe('GalleryService', () => {
    let service: GalleryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(GalleryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('can call request to server', (done: DoneFn) => {
        const tempParam = {
            limit: 10,
            page: 1,
            sort: 'title'
        };
        service.getImages(tempParam).subscribe({
            next: (res) => {
                // can define is good for test connection
                expect(res).toBeDefined();
                done();
            },
            error: (err) => {
                // this is for temporary, we may handle error from call http call here
                expect(true).toBeFalse();
                done();
            },
            complete: () => {
                done();
            }
        });
    });
});
