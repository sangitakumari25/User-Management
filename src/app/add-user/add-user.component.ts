import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  name = '';
  email = '';
  username = '';
  status = 'active';

  constructor(private router: Router) {}

  addUser() {
    if (!this.name || !this.email || !this.username) {
      alert('⚠️ Please fill all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
      id: Date.now(),
      name: this.name,
      email: this.email,
      username: this.username,
      status: this.status
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('✅ User added successfully!');
    this.router.navigate(['/dashboard']);
  }
}
