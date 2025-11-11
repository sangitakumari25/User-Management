import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  username = '';
  activeUsers = 0;
  inactiveUsers = 0;
  totalUsers = 0;

  usersFromAPI: any[] = [];
  showTable = false;

  @ViewChild('dashboardContainer', { static: true }) dashboardContainer!: ElementRef;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadUserStats();
  }

  ngAfterViewInit() {
    this.animateDashboard();
  }

  //  GSAP Animation=========================================================================================
  animateDashboard() {
    gsap.fromTo('.dashboard-header', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('.card', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 });
  }

  //  Load combined data from API + Local Storage===================================================================================
  loadUserStats() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.name || 'Sangita';

    const localUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Fetch API users first
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(apiUsers => {
      const apiFive = apiUsers.slice(0, 5); // only 5 fake users
      const combinedUsers = [...apiFive, ...localUsers];



      // Count total users combined=====================================================================================================
      this.totalUsers = combinedUsers.length;



      // Active/Inactive count from local users only (since API doesn't have status)======================================================================================================================================
      this.activeUsers = localUsers.filter((u: any) => u.status === 'active').length;
      this.inactiveUsers = localUsers.filter((u: any) => u.status === 'inactive').length;
    });
  }

  //  Navigate to Add User Page======================================================================
  goToAddUser() {
    this.router.navigate(['/add-user']);
  }

  //  View Users (Table View)============================================================
  goToViewUser() {
    this.showTable = true;
    this.fetchUsersFromAPI();
  }

  //  Logout==============================================================================
  logout() {
    this.router.navigate(['/login']);
  }

  //  Fetch API + Local Users for Table=========================================================================
  fetchUsersFromAPI() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(res => {
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
      this.usersFromAPI = [...res.slice(0, 5), ...localUsers];
      this.totalUsers = this.usersFromAPI.length;
      console.log('✅ Combined Users:', this.usersFromAPI);
    });
  }

  //  Edit User=============================================================================================
  editUser(index: number) {
    const user = this.usersFromAPI[index];
    const newName = prompt('Edit name:', user.name);
    const newEmail = prompt('Edit email:', user.email);

    if (newName && newEmail) {
      this.usersFromAPI[index].name = newName;
      this.usersFromAPI[index].email = newEmail;
      this.updateLocalStorage(this.usersFromAPI[index]);
      alert('✅ User updated successfully!');
      this.totalUsers = this.usersFromAPI.length;
    }
  }

  // Delete User ========================================================================================================
  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      const user = this.usersFromAPI[index];
      this.usersFromAPI.splice(index, 1);
      this.removeFromLocalStorage(user);
      this.totalUsers = this.usersFromAPI.length;
    }
  }

  //  Update LocalStorage after Edit===========================================================================================
  updateLocalStorage(updatedUser: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingIndex = users.findIndex((u: any) => u.id === updatedUser.id);
    if (existingIndex !== -1) {
      users[existingIndex] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem('users', JSON.stringify(users));
    this.loadUserStats();
  }

  // Remove user from localstorage after delete==================================================================================
  removeFromLocalStorage(deletedUser: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter((u: any) => u.id !== deletedUser.id);
    localStorage.setItem('users', JSON.stringify(users));
    this.loadUserStats();
  }

  //  Back to Dashboard =================================================================================================================
  backToDashboard() {
    this.showTable = false;
    this.loadUserStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
