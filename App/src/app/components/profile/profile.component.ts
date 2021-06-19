import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editmode = false;
  currentUser: any;
  profilepictureupdate=false;
  imageData:string; //temp save
  image:File;
  uploadButton:boolean=true;
  updateButton:boolean=true;
  profileForm = new FormGroup({
    firstname:new FormControl(''),
    Age:new FormControl(''),
    University:new FormControl(''),
    Title:new FormControl(''),
    About:new FormControl(''),
    City:new FormControl(''),
    Country:new FormControl(''),
    Address:new FormControl(''),
    PostalCode:new FormControl('')
  });
  constructor(
    public userService: DataServiceService,
    private route: ActivatedRoute,
    public profileupdate:AuthService,
    public router:Router
  ) { }

 ngOnInit(): void {
   this.userService.getUserData(localStorage.getItem('currentUser'))
      .subscribe(data => {
        console.log(data);
        this.currentUser = data;
        this.imageData=this.currentUser.profileImage;

      });
    console.log(this.currentUser);
  }

  alart() {
    console.log("profile pic click");
  }
  goEditMode() {
    this.editmode = true;
    this.profileForm.get('firstname').setValue(this.currentUser.firstname);
    this.profileForm.get('Age').setValue(this.currentUser.Age);
    this.profileForm.get('City').setValue(this.currentUser.City);
    this.profileForm.get('Country').setValue(this.currentUser.Country);
    this.profileForm.get('PostalCode').setValue(this.currentUser.PostalCode);
    this.profileForm.get('About').setValue(this.currentUser.About);
    this.profileForm.get('Address').setValue(this.currentUser.Address);
    this.updateButton=false;
  }
  goViewMode() {
    this.ngOnInit();
    this.editmode = false;
    this.updateButton=true;

  }

  update(value){
this.userService.updateProfileDetails(value).subscribe(res=>{
  console.log(res);

  this.ngOnInit();
})
  }

  onFileSelect(event : Event){
    this.uploadButton=false;
    const file = (event.target as HTMLInputElement).files[0];
    this.image=file
    const allowedFileTypes=["image/png", "image/jpeg", "image/jpg"];
    if(file && allowedFileTypes.includes(file.type)){
      const reader=new FileReader();
      reader.onload = () => {
        this.imageData=reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  uploadImage(){
    let fd=new FormData();
    if(this.image){
      fd.append("profileImage", this.image, this.image.name);

      this.profileupdate.updateProfile(fd).subscribe((res)=>{
        if(res['success']){

        }
      })
    }
console.log("fd" + fd);
this.uploadButton=true;
  }
}
