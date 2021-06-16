import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confpassword:string;
  imageHidden:boolean=true;
  sub:boolean=false
  registerUserData={
    email:'',
    password:'',
    firstname:''

  }
  constructor(
    public _auth:AuthService,
    public router:Router,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  showSuccess() {
   this.toastr.warning("User is Exist", "Registration Failed");
  }

  registerUser(){
    this.imageHidden=false;
    this._auth.registerUser(this.registerUserData).subscribe(
      res=>{

        if(res.exist=="yes"){
          console.log("Available")
          this.showSuccess()
         this.imageHidden=true;
        }

        else{
          console.log("Register Success")
          localStorage.setItem('token', res.token)
          this.router.navigate(['/login'])
        // this.imageHidden=true;
        }

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
