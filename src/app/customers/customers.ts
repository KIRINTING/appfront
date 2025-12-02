import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // 1. นำเข้า HttpClient

// Interface ให้ตรงกับ Database ของคุณ
export interface Customer {
  id: number;
  CustomerCode: any;
  CustomerName: any;
  Customertype: any;
  email: any;
  Phone: any;
  created_at?: any;
  updated_at?: any;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class CustomersComponent implements OnInit {
  
  // 2. เรียกใช้ HttpClient
  private http = inject(HttpClient);

  // สร้างตัวแปร customers เป็น signal ว่างๆ ไว้ก่อน
  customers = signal<Customer[]>([]);

  // *** 3. ใส่ URL ของ API หลังบ้านคุณตรงนี้ ***
  // เช่น 'http://localhost:3000/customers' หรือ 'http://localhost/api/get_customers.php'
  private apiUrl = 'http://127.0.0.1:8000/api/Customers-post'; 

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    // ยิงไปขอข้อมูล
    this.http.get<Customer[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('ได้ข้อมูลมาแล้ว:', data);
        this.customers.set(data); // เอาข้อมูลจริงยัดใส่ตาราง
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาด:', err);
      }
    });
  }

  onLogout() {
    // Logic Logout
  }
}