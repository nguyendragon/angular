import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem('userInfo')) this.router.navigate(['/']);
  }

  formSignUp = this.fb.group({
    firstname: ['Nguyễn Nhất', [Validators.required, Validators.minLength(6)]],
    lastname: ['Long', [Validators.required]],
    email: ['fptshop@fpt.edu.vn', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  handleSubmit() {
    if (!this.formSignUp.valid) {
      confirm('Vui lòng nhập đầy đủ và đúng thông tin');
      return;
    }

    const { confirmPassword, ...data }: any = this.formSignUp.value;

    if (data.password !== confirmPassword) {
      confirm('Mật khẩu không trùng khớp nhau');
      return;
    }

    this.authService.signUp(data).subscribe({
      next: (res) => {
        alert('Đăng ký thành công!');
        this.router.navigate(['/auth/signin']);
      },
      error(e) {
        if (e) alert(e.error.message);
      },
    });
  }
}
