import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/CartService';

// Interface สำหรับสินค้า (สามารถแยกไฟล์ model ได้ถ้าต้องการ)
interface Product {
  id: number;
  ProductCode: string;
  ProductName: string;
  CategoriesID: number;
  UnitPrice: number;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketdashboard.html'
})
export class Marketdashboard implements OnInit {
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  // ใช้ Signal เพื่อจัดการข้อมูลสินค้า
  products = signal<Product[]>([]);
  
  // URL API สินค้า
  private apiUrl = 'http://127.0.0.1:8000/api/Products-post';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // อาจเพิ่ม Alert หรือ Notification เล็กๆ ตรงนี้
  }
}