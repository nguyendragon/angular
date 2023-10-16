import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuShow: boolean = false;
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  constructor(private router: Router) {}

  changeShowMenu() {
    this.menuShow = !this.menuShow;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }
}
