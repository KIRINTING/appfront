import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) { }
  tokenKey = 'auth_token';

  isLoggedIn(): boolean {
    
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  logout(){
    localStorage.removeItem(this.tokenKey);

    this.router.navigate(['/login'])
  }

  getToken(): string | null {
  return localStorage.getItem(this.tokenKey);
  }
}