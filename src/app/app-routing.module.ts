import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { PreloginGuard } from '@guards/prelogin.guard';
import { LayoutComponent } from '@routes/layout/layout.component';
import { MovieAddComponent } from '@routes/layout/movie-add/movie-add.component';
import { MovieEditComponent } from '@routes/layout/movie-edit/movie-edit.component';
import { MovieListComponent } from '@routes/layout/movie-list/movie-list.component';
import { LoginComponent } from '@routes/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [PreloginGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MovieListComponent },
      { path: 'add', component: MovieAddComponent },
      { path: 'edit/:id', component: MovieEditComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
