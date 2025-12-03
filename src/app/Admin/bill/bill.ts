import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill.html'
})
export class BillComponent implements OnInit {
  orderService = inject(OrderService);
  private router = inject(Router);

  // ดึงข้อมูลออเดอร์มาเตรียมโชว์
  order = this.orderService.currentOrder;

  ngOnInit() {
    // ป้องกันการเข้าหน้าบิลเปล่าๆ (ถ้าไม่มีข้อมูลให้ดีดกลับไปหน้าสินค้า)
    if (!this.order()) {
      this.router.navigate(['/Admin/products']);
    }
  }

  // พอกดปุ่ม "ยืนยันการจ่าย"
  onPay() {
    const confirmPay = confirm('ยอดเงิน ฿' + this.order()?.totalPrice.toLocaleString() + ' ได้รับชำระแล้วใช่ไหม?');
    if (confirmPay) {
      this.orderService.markAsPaid(this.order()!.orderId); // เปลี่ยนสถานะเป็น Paid
    }
  }

  onPrint() {
    window.print();
  }

  goBack() {
    this.router.navigate(['/Admin/products']);
  }
}