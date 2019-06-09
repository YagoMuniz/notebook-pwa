import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegisterModel } from "../register/register.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private baseUrl = "https://back-notebook-pwa.herokuapp.com/";
  private endpoints = {
    ACCESS_TOKEN: "qpnYKkKXDH8126YEOjqMRrrWXrI5f1wV",
    USERS: "users",
    LOGIN: "auth"
  };

  constructor(private http: HttpClient) {}

  register(body: RegisterModel): Promise<any> {
    body.access_token = this.endpoints.ACCESS_TOKEN;
    return this.http
      .post<any>(this.baseUrl + this.endpoints.USERS, body, {})
      .toPromise();
  }

  login(username: string, password: string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': "Basic " + window.btoa(username + ":" + password)
    });

    return this.http
      .post<any>(
        this.baseUrl + this.endpoints.LOGIN,
        { 'access_token': this.endpoints.ACCESS_TOKEN },
        { headers: httpHeaders }
      )
      .pipe(map(user => {
        if (user) {
          localStorage.setItem("current_auth", user.token);
          localStorage.setItem("loggedUser", JSON.stringify(user.user));
        }
        return user;
      }))
      .toPromise();
  }
}
