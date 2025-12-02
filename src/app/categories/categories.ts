import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// 1. Interface ให้ตรงกับ Database ของคุณ (id, CategoriesName)
export interface Category {
  id: number;
  CategoriesName: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html', // อย่าลืมเปลี่ยนชื่อไฟล์ให้ตรง
  styleUrl: './categories.css',
})
export class CategoriesComponent implements OnInit {
  
  private http = inject(HttpClient);

  // 2. สร้างตัวแปร categories เป็น signal
  categories = signal<Category[]>([]);

  // 3. เปลี่ยน URL เป็น API ของ Categories
  private apiUrl = 'http://127.0.0.1:8000/api/Categories-post'; 
  authService: any;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<Category[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Categories Data:', data);
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  onLogout(){
    const confirmLogout = confirm('ต้องการออกจากระบบใช่ไหม?');
    if (confirmLogout) {
      this.authService.logout();
    }
  }
}