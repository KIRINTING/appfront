import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service'; // Import AuthService

export interface Category {
  id: number;
  CategoriesName: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class CategoriesComponent implements OnInit {
  
  private http = inject(HttpClient);
  private authService = inject(AuthService); // Inject AuthService correctly

  categories = signal<Category[]>([]);

  private apiUrl = 'http://127.0.0.1:8000/api/Categories-post'; 

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