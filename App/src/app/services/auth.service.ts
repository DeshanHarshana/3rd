import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public _registerUrl="http://localhost:3000/register";
public _loginUrl="http://localhost:3000/login";

  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

  registerUser(user){
    return this._http.post<any>(this._registerUrl, user)
  }

  loginUser(user){
    return this._http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/events'])
  }
}
