import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<any[]>([]); 

  // Count items
  count = computed(() => this.cartItems().length); 

  // Calculate Total Price
  totalPrice = computed(() => {
    return this.cartItems().reduce((total, item) => total + (Number(item.UnitPrice) || 0), 0);
  });

  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
  }

  removeFromCart(index: number) {
    this.cartItems.update(items => items.filter((_, i) => i !== index));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}