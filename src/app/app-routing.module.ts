import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    {
        path: '',
        component: GalleryComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: ''
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
