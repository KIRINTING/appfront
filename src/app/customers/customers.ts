import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth-service'; // Import AuthService

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
  
  private http = inject(HttpClient);
  private authService = inject(AuthService); // Inject AuthService

  customers = signal<Customer[]>([]);
  private apiUrl = 'http://127.0.0.1:8000/api/Customers-post'; 

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.http.get<Customer[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('ได้ข้อมูลมาแล้ว:', data);
        this.customers.set(data);
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาด:', err);
      }
    });
  }

  onLogout() {
    const confirmLogout = confirm('ต้องการออกจากระบบใช่ไหม?');
    if (confirmLogout) {
      this.authService.logout();
    }
  }
}