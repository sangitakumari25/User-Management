import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  username = '';
  activeUsers = 0;
  inactiveUsers = 0;
  totalUsers = 0;

  @ViewChild('dashboardContainer', { static: true }) dashboardContainer!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.loadUserStats();

    // Animate Header
    gsap.fromTo('.dashboard-header', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate Cards
    gsap.fromTo('.card', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.7)', delay: 0.3 }
    );

    // Animate Buttons
    gsap.fromTo('.header-buttons button', 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, delay: 0.5, ease: 'elastic.out(1, 0.5)' }
    );
  }

  // ✅ Load counts from localStorage dynamically
  loadUserStats() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.name || 'User';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.activeUsers = users.filter((u: any) => u.status === 'active').length;
    this.inactiveUsers = users.filter((u: any) => u.status === 'inactive').length;
    this.totalUsers = users.length;
  }

  goToAddUser() {
    this.router.navigate(['/add-user']);
  }

  goToViewUser() {
    this.router.navigate(['/view-user']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
