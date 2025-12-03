import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import this

@Component({
  selector: 'app-sidebar',
  standalone: true, // Ensure this is standalone
  imports: [RouterModule], // Add RouterModule to imports
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}