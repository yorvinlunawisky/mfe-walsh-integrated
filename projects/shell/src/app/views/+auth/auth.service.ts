
import {Observable} from 'rxjs';
import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Roles, RolesByUser } from 'projects/shared/models/roles/roles.model';
import { LoginToken } from 'projects/shared/models/auth/login/loginToken.model';
import { environment } from 'projects/environments/environment';    


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);


  constructor() {}
  
  login(email: string, password: string): Observable<LoginToken> {
    const loginBody = {
        grant_type: 'password',
        username: email,
        password: password    
    };
    return this.http.post<LoginToken>(environment.apiBaseUrl + 'token', loginBody);
  }
    

  getRoles(userId: string, accountId: string, tokenString: string): Observable<Roles[]>{
    const url = environment.apiBaseUrl + 'GetByUserIdAccountId?userId=' + userId + '&accountId=' + accountId;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenString);
    return this.http.get<Roles[]>(url, {headers});
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('token_expires');
    
    if (!token || !expires) {
      return false;
    }
    
    // Check if token is expired
    const expirationDate = new Date(expires);
    const currentDate = new Date();
    
    if (currentDate >= expirationDate) {
      // Token is expired, clear localStorage
      this.logout();
      return false;
    }
    
    return true;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('token_expires');
    this.router.navigate(['/auth/login']);
  }
  
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
  
  getUserEmail(): string | null {
    return localStorage.getItem('user_email');
  }

  // Accounts
  getAccounts(userId: string, tokenString: string): Observable<any>{
    const url = `${environment.apiBaseUrl}api/clientaccounts/GetUserAccountsByUserId?userId=${userId}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenString);
    return this.http.get<any>(url, {headers});
  }

  // Roles
  getRolesByUser(userId: string, accountId: string, tokenString: string): Observable<RolesByUser[]>{  
    console.log('AuthService - getRolesByUser called with:', { userId, accountId, tokenString: tokenString ? 'Present' : 'Missing' });

    const url = environment.apiBaseUrl + 'api/roles/GetByUserIdAccountId?userId=' + userId + '&accountId=' + accountId;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenString);
    
    console.log('AuthService - Making HTTP request to:', url);
    console.log('AuthService - Headers:', headers.get('Authorization') ? 'Authorization header set' : 'No Authorization header');
    
    return this.http.get<RolesByUser[]>(url, {headers});
  }

}
  