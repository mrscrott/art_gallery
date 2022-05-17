import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxDialogService, NxModalModule } from '@aposin/ng-aquila/modal';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

import { GalleryComponent } from './gallery.component';
import { GalleryService } from './service/gallery.service';

class TestGalleryService {}
describe('GalleryComponent', () => {
    let component: GalleryComponent;
    let fixture: ComponentFixture<GalleryComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                NxExpertModule,
                NxDropdownModule,
                NxFormfieldModule,
                NxPaginationModule,
                NxInputModule,
                ReactiveFormsModule,
                FormsModule,
                NxSpinnerModule,
                NxModalModule
            ],
            declarations: [GalleryComponent],
            providers: [
                HttpClient,
                NxDialogService,
                {
                    provide: GalleryService,
                    useValue: TestGalleryService
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
