// src/app/products/products.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

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
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements OnInit {
  
  private http = inject(HttpClient);
  private router = inject(Router); // Inject Router handling
  
  products = signal<Product[]>([]);

  // Base API URL
  private apiUrl = 'http://127.0.0.1:8000/api/Products-post'; 
  // Assuming a standard REST URL for specific items, e.g., http://127.0.0.1:8000/api/products
  private itemApiUrl = 'http://127.0.0.1:8000/api/Products-del'; 

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }


  onAdd() {

    this.router.navigate(['/products/create']); 
  }


  onEdit(id: number) {

    this.router.navigate(['/products/edit', id]);
  }


  onDelete(id: number) {
    if (confirm('คุณแน่ใจหรือยังที่จะลบข้อมูลนี้?')) {
      this.http.delete(`${this.itemApiUrl}/${id}`).subscribe({
        next: () => {
          alert('Product deleted successfully');
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product');
        }
      });
    }
  }
}