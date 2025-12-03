import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService, Order } from '../../services/order-service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.html'
})
export class OrdersComponent {
  orderService = inject(OrderService);
  private router = inject(Router);

  orders = this.orderService.orders;

  // ดูรายละเอียดบิล
  viewBill(order: Order) {
    this.orderService.selectOrder(order);
    this.router.navigate(['/Admin/bill']);
  }

  // กดเปลี่ยนสถานะเป็นจ่ายเงินแล้ว
  markPaid(order: Order) {
    if (confirm(`ยืนยันการชำระเงินสำหรับบิล ${order.orderId}?`)) {
      this.orderService.markAsPaid(order.orderId);
    }
  }
}