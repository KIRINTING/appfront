import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service'; // ⚠️ แก้ Path ให้ตรงกับไฟล์ของคุณ
import { CartService } from '../../services/CartService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar {
  // Inject Service เข้ามา
  authService = inject(AuthService);
  cartService = inject(CartService);

  onLogout() {
    const confirmLogout = confirm('คุณต้องการออกจากระบบใช่หรือไม่?');
    
    if (confirmLogout) {
      this.authService.logout();
    }
  }

  onClick(){
  }

}