import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';

import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminMovieComponent } from './pages/admin/admin-movie/admin-movie.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminSettingComponent } from './pages/admin/admin-setting/admin-setting.component';
import { MovieEditComponent } from './pages/movie-edit/movie-edit.component';
import { MovieAddComponent } from './pages/movie-add/movie-add.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'movie/:id', component: MovieDetailComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user', component: AdminUserComponent },
      { path: 'movie', component: AdminMovieComponent },
      { path: 'movie/add', component: MovieAddComponent },
      { path: 'movie/:movieId/edit', component: MovieEditComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'settings', component: AdminSettingComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
