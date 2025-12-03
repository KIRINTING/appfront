import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  constructor(private http: HttpClient) {

  }

  errorMessage = '';
  apiUrl: string = 'http://127.0.0.1:8000/api/login';

  loginData = {
    username: '',
    password: '',
    remember: false
  }

  onSubmit() {
    this.http.post(this.apiUrl, this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login สำเร็จ:', res);

        if (res.token) {
        localStorage.setItem('auth_token', res.token);
      }
        this.router.navigate(['/Admin/dashboard']);
      },
      error: (error) => {
        console.error('Login ล้มเหลว:', error);

        if (error.status === 401) {
          this.errorMessage = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
        } else {
          this.errorMessage = 'เกิดข้อผิดพลาดที่ระบบ กรุณาลองใหม่';
        }
      }
    })
  }
}
