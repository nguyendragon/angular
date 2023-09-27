import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { SearchBoxPipe } from './search-box.pipe';
import { ChangeNumberPipe } from './change-number.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
