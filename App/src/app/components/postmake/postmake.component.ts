import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-postmake',
  templateUrl: './postmake.component.html',
  styleUrls: ['./postmake.component.css']
})
export class PostmakeComponent implements OnInit {
  postgroup = new FormGroup({
    Uid:new FormControl(localStorage.getItem('currentUser')),
    Title:new FormControl(''),
    Date:new FormControl('2021-6-11'),
    Content:new FormControl('')

  })

  constructor(
    public _dataService:DataServiceService
  ) { }

  ngOnInit(): void {
  }
  submitPost(post){
    console.log(post)
this._dataService.postPost(post).subscribe((res)=>{
  console.log(res);
})
  }
}
