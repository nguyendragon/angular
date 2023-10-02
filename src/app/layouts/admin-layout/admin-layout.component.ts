import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface IMenu {
  icon: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  theme: string = 'dark';
  menus: IMenu[] = [
    {
      icon: '<i class="text-xl fa-solid fa-chart-pie"></i>',
      text: 'Dashboard',
      link: '/admin/dashboard',
    },
    {
      icon: '<i class="text-xl fa-solid fa-users"></i>',
      text: 'Quản người dùng',
      link: '/admin/user',
    },
    {
      icon: '<i class="fa-solid fa-film"></i>',
      text: 'Quản lý phim',
      link: '/admin/movie',
    },
    {
      icon: '<i class="fa-solid fa-bookmark"></i>',
      text: 'Quản lý danh mục',
      link: '/admin/category',
    },
    {
      icon: '<i class="text-xl fa-solid fa-gear"></i>',
      text: 'Cài đặt',
      link: '/admin/settings',
    },
  ];

  // constructor(private router: Router) {
  //   // Kiểm tra trạng thái active bằng cách sử dụng Router
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.url = event.url;
  //     }
  //   });
  // }

  changeTheme(theme: string) {
    this.theme = theme;
  }
}
