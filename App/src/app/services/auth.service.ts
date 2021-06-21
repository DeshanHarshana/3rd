import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(
    public _http:HttpClient,
    public router:Router
  ) {

  }

  registerUser(user){
    return this._http.post<any>("http://localhost:3000/register", user)
  }

  loginUser(user){
    return this._http.post<any>("http://localhost:3000/login", user)
  }
  updateProfile(image:any){
    console.log("huk " + localStorage.getItem('currentUser'))
    return this._http.post<any>("http://localhost:3000/profile/"+localStorage.getItem('currentUser')+"/uploadPhoto", image);
  }


  loggedIn(){
    return (!!localStorage.getItem('token') );
  }

  emailVerified(){
    return localStorage.getItem('email')=='true';
  }


  getToken(){
    return localStorage.getItem('token')
  }
  logout(){

  }
  profile(){
    this.router.navigate(['profile/'+localStorage.getItem('currentUser')]);
  }


  handleWarningAlert() {

    Swal.fire({
      title: 'Logout',
      text: 'Are you sure!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Stay Login',
    }).then((result) => {

      if (result.isConfirmed) {

        localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('login');
    localStorage.removeItem('userName');
    localStorage.removeItem("login");
    localStorage.removeItem('email');
    localStorage.removeItem('postid');
    localStorage.removeItem('ProfileImage');
    this.router.navigate(['/events'])

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })

  }

}
