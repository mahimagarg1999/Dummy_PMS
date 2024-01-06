import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // this.http.get<any>(`http://localhost:5000/api/get_user_by_email?email=${this.getEmail}`)

  apiEndpoint:any= "http://localhost:5000/api";
constructor(private http:HttpClient){}
  tokenFun(email: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `${token}` // Assuming it's a Bearer token
       });
    // Corrected the syntax for building the URL
  // return this.http.get(`${this.apiEndpoint}/get_user_by_email/${email}`,{headers})
  return this.http.get(`${this.apiEndpoint}/get_user_by_email?email=${email}`,{headers})

 }


  // private readonly apiUrl = 'http://localhost:5000/api/login';
  // private tokenSubject: BehaviorSubject<string | null>;

  // constructor(private http: HttpClient) {
  //   this.tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  // }
  // private getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // private setToken(token: string): void {
  //   localStorage.setItem('token', token);
  //   this.tokenSubject.next(token);
  // }
  // login(credentials: { username: string, password: string }): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/login`, credentials)
  //     .pipe(
  //       tap(response => {
  //         const token = response.token; // adjust based on your API response
  //         this.setToken(token);
  //       })
  //     );
  // }
  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.tokenSubject.next(null);
  // }
  // isAuthenticated(): boolean {
  //   const token = this.getToken();
  //   return !!token; // Adjust based on your authentication logic
  // }

  // getTokenObservable(): Observable<string | null> {
  //   return this.tokenSubject.asObservable();
  // }
}
