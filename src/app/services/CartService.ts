import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<any[]>([]); // รายการสินค้า

  // ตัวแปรนี้จะอัปเดตตัวเองอัตโนมัติเมื่อ cartItems เปลี่ยน
  count = computed(() => this.cartItems().length); 

  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
  }
}