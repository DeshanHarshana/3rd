import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
specialevents=[]
  constructor(
    public _event:DataServiceService,
    public router:Router
  ) { }

  ngOnInit(): void {

    this._event.getPost(localStorage.getItem('currentUser'))
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
  goAdd(){
    this.router.navigate(['add-post/'+localStorage.getItem('currentUser')])
  }
}
