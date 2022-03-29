import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from 'app/app-routing.module';
import { LayoutComponent } from './layout.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
    imports: [
        AppRoutingModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        MovieAddComponent,
        MovieEditComponent,
        MovieListComponent
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule { }
