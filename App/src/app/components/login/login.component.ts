import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
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
    public router:Router,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }
  showSuccess(message:String) {
    this.toastr.warning(message.toString(), "Login Failed");
   }
  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      res=>{
        if(res.nouser=='yes'){
          this.showSuccess("User not Exist")
        }
        else if(res.emailVerified=='no'){
          this.showSuccess("Please Check Your Email And Confirm Email. Check Spams folder also");
        }
        else if(res.pw=='yes'){
          this.showSuccess("Wrong Password")
        }
        else{
            console.log(res)
            localStorage.setItem('token', res.token)
            localStorage.setItem('currentUser', res.uid);
            localStorage.setItem('email','true');
            console.log(localStorage.getItem('currentUser'));
            this.router.navigate(['/special'])

      }},
      err=>{
        console.log(err)
      }
    )
  }
}
