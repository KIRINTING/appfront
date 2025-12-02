import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  apiUrl: string = 'http://127.0.0.1:8000/api';
  loginapiUrl: string = 'http://127.0.0.1:8000/api/register'; // เนื่องจากจะทำให้ ตัวcode ภายในฟังชื่สันลง จึง ประกาศ link api เก็บไว้ใน ตัวแปรที่ตั้งขึ้น เพื่อนำไปใช้แทน //

  userData = {
    username: '',
    email: '',
    full_name: '',
    password: ''
  }

  provinces: any[] = [];
  districts: any[] = [];
  subDistricts: any[] = [];

  selectedProvinceId: any = '';
  selectedDistrictId: any = '';
  selectedSubDistrictId: any = '';

constructor(private http: HttpClient , private router:Router) {

}

  ngOnInit(): void {
    this.loadProvinces();
  }


  loadProvinces() {
    this.http.get<any[]>(`${this.apiUrl}/provinces`).subscribe(data => {
      this.provinces = data;
    });
  }

  onProvinceChange() {
    this.selectedDistrictId = '';
    this.selectedSubDistrictId = '';
    this.districts = [];
    this.subDistricts = [];

    if (this.selectedProvinceId) {
      this.http.get<any[]>(`${this.apiUrl}/districts/${this.selectedProvinceId}`)
        .subscribe(data => {
          this.districts = data;
        });
    }
  }

  onDistrictChange() {
    this.selectedSubDistrictId = '';
    this.subDistricts = [];

    if (this.selectedDistrictId) {
      this.http.get<any[]>(`${this.apiUrl}/subdistricts/${this.selectedDistrictId}`)
        .subscribe(data => {
          this.subDistricts = data;
        });
    }
  }

  onRegister() {
    this.http.post(this.loginapiUrl, this.userData).subscribe({
      next: (res: any) => {
        console.log('Success:', res);
        this.router.navigate(['/login']);
      }
    })
  }
}