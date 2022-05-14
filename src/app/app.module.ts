import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { NxExpertModule } from '@aposin/ng-aquila/config';
import { HttpClientModule } from '@angular/common/http';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxModalModule } from '@aposin/ng-aquila/modal';

@NgModule({
    declarations: [AppComponent, GalleryComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NxExpertModule,
        HttpClientModule,
        NxDropdownModule,
        NxFormfieldModule,
        NxPaginationModule,
        NxInputModule,
        ReactiveFormsModule,
        FormsModule,
        NxSpinnerModule,
        NxModalModule
    ],
    exports: [NxDropdownModule, NxExpertModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
