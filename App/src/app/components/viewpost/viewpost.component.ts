import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as customBuild from 'src/app/build/ckeditor';
import { LoaderService } from 'src/app/loader/loader.service';
@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  details:any;
  htmlData="<p>rtratg</p><p>&nbsp;</p><p><strong>adA</strong></p>";
  currentUser=localStorage.getItem('currentUser');
  public Editor = customBuild;
  config={
    toolbar:{
      items:[

      ]
    }
  }
  constructor(
    public route:ActivatedRoute,
    public _event:DataServiceService,
    public router:Router,
    public loaderService:LoaderService

  ) { }

  ngOnInit(): void {
console.log(this.route.snapshot.params.id)
    this._event.getPost(this.route.snapshot.params.id)
    .subscribe(
      res=>this.details=res,
      err=>{
       console.log("Error Getting Data");
      }
    )

  }
  goEdit(id){
this.router.navigate(['update-post/'+id]);
  }
  delete(id){
this._event.deletePost(id).subscribe((res)=>{
  console.log(res);
  this.router.navigate(['special']);
})
  }
}
