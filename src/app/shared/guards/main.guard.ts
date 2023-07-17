import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the 'token' value exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirect the user to another route
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
