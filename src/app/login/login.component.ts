import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('containerElem', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;
    const signUpButton = container.querySelector('#signUp');
    const signInButton = container.querySelector('#signIn');

    signUpButton?.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

  //  Login Function================================================================================================
  onLogin(loginForm: NgForm) {
    if (!loginForm.valid) {
      alert('Please fill all fields!');
      return;
    }

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (
        loginForm.value.email === parsedUser.email &&
        loginForm.value.password === parsedUser.password
      ) {
        alert('Login successful!');
        this.router.navigate(['/dashboard']); //  Main dashboard
      } else {
        alert('Invalid email or password!');
      }
    } else {
      alert('No user found! Please sign up first.');
    }
  }

  //  Signup Function======================================================================================================
  onSignup(signupForm: NgForm) {
    if (!signupForm.valid) {
      alert('Please fill all fields!');
      return;
    }

    const userData = {
      name: signupForm.value.name,
      email: signupForm.value.email,
      password: signupForm.value.password
    };

    localStorage.setItem('user', JSON.stringify(userData));
    alert('Account created successfully!');
    this.router.navigate(['/dashboard']); //  Main dashboard==================================================================
  }
}
