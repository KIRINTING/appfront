import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/CartService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  templateUrl: './navbar.html'
})
export class Navbar {
  authService = inject(AuthService);
  cartService = inject(CartService);

  onLogout() {
    const confirmLogout = confirm('คุณต้องการออกจากระบบใช่หรือไม่?');
    if (confirmLogout) {
      this.authService.logout();
    }
  }
}