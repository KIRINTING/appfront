import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.html'
})
export class ProductEditComponent implements OnInit {
  
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = signal(false); // Signal to track mode

  productData = {
    id: 0,
    ProductCode: '',
    ProductName: '',
    CategoriesID: 0,
    UnitPrice: 0
  };

  // API Urls
  private updateApiUrl = 'http://127.0.0.1:8000/api/Products-edit';
  private createApiUrl = 'http://127.0.0.1:8000/api/Products-post'; 

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode.set(true);
      this.loadProduct(id);
    } else {
      this.isEditMode.set(false);
    }
  }

  // Load existing product
  loadProduct(id: string) {
    // Assuming GET request for a single item goes to the edit endpoint or similar
    this.http.get<any>(`${this.updateApiUrl}/${id}`).subscribe({
      next: (data) => {
        console.log('Original Data:', data);
        this.productData = data; 
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        alert('ไม่สามารถดึงข้อมูลสินค้าได้');
        this.router.navigate(['/products']);
      }
    });
  }

  // Handle Submit (Create or Update)
  onSubmit() {
    if (this.isEditMode()) {
      // Update Mode (PATCH)
      const id = this.productData.id;
      this.http.patch(`${this.updateApiUrl}/${id}`, this.productData).subscribe({
        next: (res) => {
          console.log('Update success:', res);
          alert('แก้ไขข้อมูลสำเร็จ!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
      });
    } else {
      // Create Mode (POST)
      this.http.post(this.createApiUrl, this.productData).subscribe({
        next: (res) => {
          console.log('Create success:', res);
          alert('เพิ่มสินค้าสำเร็จ!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Create failed:', err);
          alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}