import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { RegisterModel } from "../register/register.model";
import { Notebook } from "../components/novo-caderno/notebook.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private baseUrl = "https://back-notebook-pwa.herokuapp.com/";
  private endpoints = {
    ACCESS_TOKEN: "qpnYKkKXDH8126YEOjqMRrrWXrI5f1wV",
    USERS: "users",
    LOGIN: "auth",
    NOTEBOOKS: "notebooks"
  };

  private notebooks = new Subject<Array<Notebook>>();

  constructor(private http: HttpClient) {}

  register(body: RegisterModel): Promise<any> {
    body.access_token = this.endpoints.ACCESS_TOKEN;
    return this.http
      .post<any>(this.baseUrl + this.endpoints.USERS, body, {})
      .toPromise();
  }

  logout(): Promise<any> {
    return Promise.resolve(() => {
      localStorage.removeItem("current_auth");
      localStorage.removeItem("loggedUser");
    });
  }

  login(username: string, password: string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: "Basic " + window.btoa(username + ":" + password)
    });

    return this.http
      .post<any>(
        this.baseUrl + this.endpoints.LOGIN,
        { access_token: this.endpoints.ACCESS_TOKEN },
        { headers: httpHeaders }
      )
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem("current_auth", user.token);
            localStorage.setItem("loggedUser", JSON.stringify(user.user));
          }
          return user;
        })
      )
      .toPromise();
  }

  loadNotebooks(): Promise<any> {
    return this.http
      .get(this.baseUrl + this.endpoints.NOTEBOOKS, {
        headers: this.getHeaders()
      })
      .toPromise();
  }

  loadNotebookById(id: string): Promise<any> {
    return this.http
      .get(this.baseUrl + this.endpoints.NOTEBOOKS + `/${id}`, {
        headers: this.getHeaders()
      })
      .toPromise();
  }

  createNotebook(notebook: Notebook): Promise<any> {
    return this.http
      .post(this.baseUrl + this.endpoints.NOTEBOOKS, notebook, {
        headers: this.getHeaders()
      })
      .toPromise();
  }

  getNotebookObs(): Observable<Array<Notebook>> {
    return this.notebooks.asObservable();
  }

  setNotebookObs(nb: Array<Notebook>) {
    this.notebooks.next(nb);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("current_auth")
    });
  }
}
