import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Import ไฟล์ที่คุณแยกไว้
import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  // ใส่ใน imports array
  imports: [RouterOutlet, Navbar, Sidebar, Footer], 
  templateUrl: './main-layout.html'
})
export class MainLayoutComponent {}