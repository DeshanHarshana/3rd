import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confpassword:string;
  sub:boolean=false
  registerUserData={
    email:'',
    password:'',
    data:{
      firstname:''
    }
  }
  constructor(
    public _auth:AuthService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe(
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
  checkPasswords() { // here we have the 'passwords' group
    return !(this.confpassword==this.registerUserData.password);
  }
}
