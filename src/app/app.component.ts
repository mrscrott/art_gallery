import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ag-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'gallery';
    ngOnInit(): void {}
}
