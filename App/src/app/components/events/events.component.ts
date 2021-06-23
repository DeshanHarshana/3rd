import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  specialevents:any=[]
  constructor(
    public _event:DataServiceService,
    public router:Router,
    public loaderService:LoaderService
  ) { }

  ngOnInit(): void {

    this._event.getAllPosts()
    .subscribe(
      res=>this.specialevents=res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      }
    );
   localStorage.setItem("login", "yes");
  }

  show(id){
    this.router.navigate(['view-post/'+id]);
  }
  goAll(){
this.ngOnInit();
  }
  goTech(){
    let Category= 'Technology'
    this._event.getSpecificPost(Category)
    .subscribe(
      res=>this.specialevents=res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      }
    );
  }
  goTradi(){

    let Category= 'Traditional'

      console.log(Category)
      this._event.getSpecificPost(Category)
      .subscribe((res)=>{
        this.specialevents=res
      }

      );
  }
  goEconomy(){

      let Category="Economic"

console.log(Category)
      this._event.getSpecificPost(Category)
      .subscribe(
        res=>this.specialevents=res


      );
  }
  goOther(){
    let Category= 'Other'
      this._event.getSpecificPost(Category)
      .subscribe(
        res=>this.specialevents=res,
        err=>{
          if(err instanceof HttpErrorResponse){
            if(err.status===401){
              this.router.navigate(['/login'])
            }
          }
        }
      );
  }
}
