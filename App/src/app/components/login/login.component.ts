import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })
  constructor(
    public _auth:AuthService,
    public router:Router,
    public toastr:ToastrService,
    public dataService:DataServiceService
  ) { }

  ngOnInit(): void {
  }
  showSuccess(message:String) {
    this.toastr.warning(message.toString(), "Login Failed");
   }
  loginUser(form){
    this._auth.loginUser(form).subscribe(
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
            localStorage.setItem('userName', res.userName);
            localStorage.setItem('email','true');
            localStorage.setItem('ProfileImage',res.ProfileImage);
            console.log(localStorage.getItem('currentUser'));
            this.router.navigate(['/special'])

      }},
      err=>{
        console.log(err)
      }
    )
  }
}
