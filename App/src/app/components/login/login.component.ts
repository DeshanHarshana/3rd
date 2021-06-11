import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginUserData={
  email:'',
  password:''
}
  constructor(
    public _auth:AuthService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }
  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/special'])
      },
      err=>{
        console.log(err)
      }
    )
  }
}
