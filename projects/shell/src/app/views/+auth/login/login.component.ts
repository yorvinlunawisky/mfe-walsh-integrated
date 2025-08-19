import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
currentYear: number = new Date().getFullYear();
 email: string = 'brittanyb@walshintegrated.com';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

loginGroupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });

  onSubmit() {
    if (this.loginGroupForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginGroupForm.value.email ?? '', this.loginGroupForm.value.password ?? '').subscribe({
        next: (response) => {
          // Create legacy-compatible currentUser format for seamless navigation to legacy app
          const legacyCurrentUser = {
            access_token: response.access_token,
            token_type: response.token_type,
            expires_in: response.expires_in,
            expires: response.expires,
            issued: response.issued,
            userName: response.userName,
            UserId: response.UserId,
            Email: response.Email,
            // Add additional properties that might be needed by legacy app
            '.issued': response.issued  // Legacy app might expect dot notation
          };

          // Store in legacy-compatible format for cross-app compatibility
          localStorage.setItem('currentUser', JSON.stringify(legacyCurrentUser));
          
          // Continue storing individual properties for shell app compatibility
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_id', response.UserId);
          localStorage.setItem('user_email', response.Email);
          localStorage.setItem('user_name', response.userName);
          localStorage.setItem('token_expires', response.expires);
          // Set isLoggedIn flag for legacy app compatibility
          localStorage.setItem('isLoggedIn', 'true');
          
          // Fetch additional user details
          this.authService.getUserById(response.UserId, response.access_token).subscribe({
            next: (userDetails) => {
              localStorage.setItem('userFirstName', userDetails.FirstName);
              localStorage.setItem('userLastName', userDetails.LastName);
              console.log('User details fetched and stored');
            },
            error: (error) => {
              console.log('Error fetching user details:', error);
            }
          });
          
        },
        error: (error) => {
          console.log('Login error:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/accounts']);
        }
      } )
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
