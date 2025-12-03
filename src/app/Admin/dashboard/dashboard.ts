import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// กำหนดรูปแบบข้อมูล Order
interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  orderDate: string;
  paymentStatus: 'Paid' | 'Unpaid'; // สถานะ: จ่ายแล้ว หรือ ยังไม่จ่าย
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  
  private http = inject(HttpClient);

  // ใช้ Signal สำหรับเก็บรายการ Order
  orders = signal<Order[]>([]);

  // URL API (ตัวอย่าง: คุณต้องเปลี่ยนเป็น API ของคุณเมื่อพร้อม)
  private apiUrl = 'http://127.0.0.1:8000/api/orders'; 

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // --- จำลองข้อมูล (Mock Data) ---
    // เนื่องจากยังไม่มี API Order จริง ให้ใช้ข้อมูลนี้ทดสอบการแสดงผล
    // const mockOrders: Order[] = [
    //   { id: 1001, customerName: 'Somchai', totalAmount: 1500, orderDate: '2025-03-01', paymentStatus: 'Paid' },
    //   { id: 1002, customerName: 'Somsri', totalAmount: 590, orderDate: '2025-03-02', paymentStatus: 'Unpaid' },
    //   { id: 1003, customerName: 'John Doe', totalAmount: 3200, orderDate: '2025-03-02', paymentStatus: 'Unpaid' },
    //   { id: 1004, customerName: 'Jane Smith', totalAmount: 850, orderDate: '2025-03-03', paymentStatus: 'Paid' },
    //   { id: 1005, customerName: 'Wichai', totalAmount: 120, orderDate: '2025-03-03', paymentStatus: 'Paid' },
    //   { id: 1006, customerName: 'Anucha', totalAmount: 1500, orderDate: '2025-11-01', paymentStatus: 'Paid' },
    //   { id: 1007, customerName: 'Kanchitpol', totalAmount: 2540, orderDate: '2025-01-01', paymentStatus: 'Paid' },
    //   { id: 1008, customerName: 'Panuwit', totalAmount: 74000, orderDate: '2025-12-03', paymentStatus: 'Paid' },
    // ];
    // this.orders.set(mockOrders);

    // --- ถ้ามี API จริง ให้เปิดใช้โค้ดด้านล่างนี้แทน ---

    this.http.get<Order[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.orders.set(data);
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  // ฟังก์ชันสำหรับเปลี่ยนสถานะ (จำลองการทำงาน)
  togglePaymentStatus(order: Order) {
    const newStatus = order.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
    
    // อัปเดตข้อมูลใน Signal (ในความเป็นจริงควรยิง API ไปอัปเดตหลังบ้านด้วย)
    this.orders.update(items => 
      items.map(item => item.id === order.id ? { ...item, paymentStatus: newStatus } : item)
    );
  }
}