import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem('userInfo')) this.router.navigate(['/']);
  }

  formSignIn = this.fb.group({
    email: ['fptshop@fpt.edu.vn', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  handleSubmit() {
    if (this.formSignIn.valid) {
      const { email, password }: any = this.formSignIn.value;

      this.authService
        .signIn({
          email: email.trim(),
          password: password.trim(),
        })
        .subscribe({
          next: (res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
            alert('Đăng nhập thành công!');
            this.router.navigate(['/']);
          },
          error(e) {
            if (e) alert(e.error.message);
          },
        });
    } else {
      confirm('Vui lòng nhập đầy đủ và đúng thông tin');
    }
  }
}
