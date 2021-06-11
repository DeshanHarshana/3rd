import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
events=[]
  constructor(
    public _event:EventService
  ) { }

  ngOnInit(): void {
    this._event.getEvents()
    .subscribe(
      res=>this.events=res,
      err=>console.log(err)
    )
  }


}
