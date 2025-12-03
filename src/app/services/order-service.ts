import { Injectable, signal } from '@angular/core';

export interface Order {
  orderId: string;
  items: any[];
  totalPrice: number;
  status: 'Pending' | 'Paid';
  customerName: string;
  date: Date;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  // เก็บรายการออเดอร์ทั้งหมด
  orders = signal<Order[]>([]);
  
  // เก็บออเดอร์ปัจจุบันที่กำลังดูอยู่ (สำหรับหน้าใบเสร็จ)
  currentOrder = signal<Order | null>(null);

  createOrder(items: any[], total: number, customerName: string = 'ลูกค้าทั่วไป') {
    const newOrder: Order = {
      orderId: 'INV-' + Math.floor(100000 + Math.random() * 900000),
      items: [...items],
      totalPrice: total,
      status: 'Pending',
      customerName: customerName,
      date: new Date()
    };

    // เพิ่มลงในรายการทั้งหมด และตั้งเป็นออเดอร์ปัจจุบัน
    this.orders.update(list => [newOrder, ...list]);
    this.currentOrder.set(newOrder);
  }

  // ฟังก์ชันหาและอัปเดตสถานะในรายการ
  markAsPaid(orderId: string) {
    this.orders.update(list => 
      list.map(o => o.orderId === orderId ? { ...o, status: 'Paid' } : o)
    );
    
    // ถ้าเป็นออเดอร์ปัจจุบันก็อัปเดตด้วย
    if (this.currentOrder()?.orderId === orderId) {
      this.currentOrder.update(o => o ? { ...o, status: 'Paid' } : null);
    }
  }
  
  // เลือกออเดอร์เพื่อดูบิล
  selectOrder(order: Order) {
    this.currentOrder.set(order);
  }
}