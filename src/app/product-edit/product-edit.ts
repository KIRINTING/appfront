// src/app/products/product-edit.ts
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

  // ตัวแปรสำหรับเก็บข้อมูลที่จะแก้ไข
  productData = {
    id: 0,
    ProductCode: '',
    ProductName: '',
    CategoriesID: 0,
    UnitPrice: 0
  };

  // URL API หลัก (ต้องตรงกับ Backend ของคุณ)
  // สมมติว่าใช้ URL นี้สำหรับการดึงรายตัวและอัปเดต
  private apiUrl = 'http://127.0.0.1:8000/api/Products-edit';

  ngOnInit() {
    // 1. ดึง ID จาก URL (เช่น /products/edit/5 -> ได้ id = 5)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.loadProduct(id);
    }
  }
  // 2. โหลดข้อมูลสินค้าเดิมมาแสดงในฟอร์ม
  loadProduct(id: string) {
  // ✅ แก้ไข: เติม /${id} เพื่อดึงเฉพาะสินค้านั้น
  this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
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

  // 3. บันทึกการแก้ไข (Update)
  onSubmit() {
    const id = this.productData.id;
    
    // ส่งข้อมูลแบบ PUT ไปที่ Backend
    this.http.patch(`${this.apiUrl}/${id}`, this.productData).subscribe({
      next: (res) => {
        console.log('Update success:', res);
        alert('แก้ไขข้อมูลสำเร็จ!');
        this.router.navigate(['/products']); // กลับไปหน้ารายการ
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    });
  }

  // ปุ่มยกเลิก
  onCancel() {
    this.router.navigate(['/products']);
  }
}