import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule], // อย่าลืม import FormsModule สำหรับ ngModel
  templateUrl: 'product-edit.html'
})
export class ProductEditComponent implements OnInit {
  
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = signal(false); // ตัวแปรเช็คสถานะว่ากำลัง แก้ไข หรือ เพิ่มใหม่

  // โมเดลข้อมูลสินค้า
  productData = {
    id: 0,
    ProductCode: '',
    ProductName: '',
    CategoriesID: 0,
    UnitPrice: 0
  };

  // API URL
  private updateApiUrl = 'http://127.0.0.1:8000/api/Products-edit'; // สำหรับแก้ไข (PATCH/PUT)
  private createApiUrl = 'http://127.0.0.1:8000/api/Products-post'; // สำหรับเพิ่ม (POST)
  private getApiUrl = 'http://127.0.0.1:8000/api/Products-post'; // สำหรับดึงข้อมูล (ถ้า API ใช้ URL เดียวกัน)

  ngOnInit() {
    // ตรวจสอบว่ามี ID ส่งมาใน URL หรือไม่
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode.set(true);
      this.loadProduct(id);
    } else {
      this.isEditMode.set(false);
    }
  }

  // โหลดข้อมูลสินค้าเดิม (สำหรับเคสแก้ไข)
  loadProduct(id: string) {
    // หมายเหตุ: ตรงนี้ต้องดูว่า Backend ของคุณใช้ API ไหนในการดึงสินค้าชิ้นเดียว
    // สมมติว่าใช้ Products-edit/{id} หรือ Products-post/{id}
    this.http.get<any>(`${this.updateApiUrl}/${id}`).subscribe({
      next: (data) => {
        console.log('Original Data:', data);
        this.productData = data; 
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        alert('ไม่สามารถดึงข้อมูลสินค้าได้');
        this.router.navigate(['/Admin/products']);
      }
    });
  }

  // บันทึกข้อมูล (ใช้ได้ทั้ง Add และ Edit)
  onSubmit() {
    if (this.isEditMode()) {
      // --- กรณีแก้ไข (Update) ---
      const id = this.productData.id;
      this.http.patch(`${this.updateApiUrl}/${id}`, this.productData).subscribe({
        next: (res) => {
          alert('แก้ไขข้อมูลสำเร็จ!');
          this.router.navigate(['/Admin/products']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
      });
    } else {
      // --- กรณีเพิ่มใหม่ (Create) ---
      this.http.post(this.createApiUrl, this.productData).subscribe({
        next: (res) => {
          alert('เพิ่มสินค้าสำเร็จ!');
          this.router.navigate(['/Admin/products']);
        },
        error: (err) => {
          console.error('Create failed:', err);
          alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/Admin/products']);
  }
}