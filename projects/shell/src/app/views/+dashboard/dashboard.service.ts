
import {Observable} from 'rxjs';
import {Injectable, inject} from '@angular/core';
import {Router} from '@angular/router';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'projects/environments/environment';    


@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  router = inject(Router);
  http = inject(HttpClient);


  constructor() {}

}