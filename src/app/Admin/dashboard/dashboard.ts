import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/CartService'; // Import CartService

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
}

export interface Product {
  id: number;
  ProductCode: string;
  ProductName: string;
  CategoriesID: number;
  UnitPrice: number;
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService); // Inject CartService

  products = signal<Product[]>([]);
  users = signal<User[]>([]);

  ngOnInit() {
    this.fetchUsers();
    this.showProducts();
  }

  fetchUsers() {
    this.http.get<User[]>('http://127.0.0.1:8000/api/register-show')
      .subscribe({
        next: (data) => {
          this.users.set(data);
        },
        error: (err) => console.error('Error fetching data:', err)
      });
  }

  showProducts() {
    this.http.get<Product[]>('http://127.0.0.1:8000/api/Products-post').subscribe({
      next: (data) => {
        console.log('Product Data:', data);
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product); // Add to cart functionality
    console.log('เพิ่มสินค้า:', product.ProductName);
  }

  onLogout() {
    const confirmLogout = confirm('ต้องการออกจากระบบใช่ไหม?');
    if (confirmLogout) {
      this.authService.logout();
    }
  }
}