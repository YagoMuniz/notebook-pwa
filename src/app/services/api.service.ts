import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../register/register.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://back-notebook-pwa.herokuapp.com/';
  private endpoints = {
    ACCESS_TOKEN: 'qpnYKkKXDH8126YEOjqMRrrWXrI5f1wV',
    USERS: 'users'
  }

  constructor(private http: HttpClient) { }

  register(body: RegisterModel): Promise<any> {
    body.access_token = this.endpoints.ACCESS_TOKEN;
    return this.http.post(
      this.baseUrl + this.endpoints.USERS,
      body,
      {}
    ).toPromise();
  }

  login() {}
}
