
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verified-success',
  templateUrl: './verified-success.component.html',
  styleUrls: ['./verified-success.component.css']
})
export class VerifiedSuccessComponent implements OnInit {

  constructor(
    public _router:Router
  ) { }

  ngOnInit(): void {
  }
  gotoLogin(){
this._router.navigate(['/login']);
  }
}
