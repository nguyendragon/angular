import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { SearchBoxPipe } from './search-box.pipe';
import { ChangeNumberPipe } from './change-number.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopMovieComponent } from './components/top-movie/top-movie.component';
import { AdminMovieComponent } from './pages/admin/admin-movie/admin-movie.component';
import { AdminUserComponent } from './pages/admin/admin-user/admin-user.component';
import { AdminCategoryComponent } from './pages/admin/admin-category/admin-category.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminSettingComponent } from './pages/admin/admin-setting/admin-setting.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { MovieEditComponent } from './pages/movie-edit/movie-edit.component';
import { MovieAddComponent } from './pages/movie-add/movie-add.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

// github.com/datlt2306/web208
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SearchBoxPipe,
    ChangeNumberPipe,
    BaseLayoutComponent,
    AdminLayoutComponent,
    HomePageComponent,
    MovieDetailComponent,
    MovieListComponent,
    HeaderComponent,
    SidebarComponent,
    TopMovieComponent,
    AdminMovieComponent,
    AdminUserComponent,
    AdminCategoryComponent,
    AdminDashboardComponent,
    AdminSettingComponent,
    DeleteModalComponent,
    MovieEditComponent,
    MovieAddComponent,
    FooterComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
