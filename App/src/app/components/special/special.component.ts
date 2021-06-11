import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
specialevents=[]
  constructor(
    public _event:EventService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this._event.getSpecialEvent()
    .subscribe(
      res=>this.specialevents=res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

}
