import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser = { name: '', email: '', status: '' };

  constructor(private router: Router) {}

  addUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.status) {
      alert('Please fill all fields!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('User added successfully!');
    this.router.navigate(['/view-user']);
  }
}
