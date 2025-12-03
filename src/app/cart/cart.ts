import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/CartService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class CartComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  onCheckout() {
    if (this.cartService.count() === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const confirmCheckout = confirm(`Confirm payment of ฿${this.cartService.totalPrice().toLocaleString()}?`);
    if (confirmCheckout) {
      alert('Payment Successful!');
      this.cartService.clearCart();
      this.router.navigate(['marketdashboard']);
    }
  }
}