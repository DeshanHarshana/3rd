import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import * as customBuild from 'src/app/build/ckeditor';
import { LoaderService } from 'src/app/loader/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  details:any;
  comments:any;
  postid:string;

  currentDate = new Date();

  currentUser=localStorage.getItem('currentUser');
  cmt = new FormGroup({
    Userid:new FormControl(localStorage.getItem('currentUser')),

    Comment:new FormControl(''),
    Date:new FormControl(this.currentDate),
    Uname:new FormControl(localStorage.getItem('userName')),
    ProfileImage:new FormControl(localStorage.getItem('ProfileImage'))

  })

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
    public loaderService:LoaderService,
    public toastr:ToastrService,

  ) { }

  ngOnInit(): void {

this.postid=this.route.snapshot.params.id;
    this._event.getPost(this.route.snapshot.params.id)
    .subscribe(
      res=>{
        this.details=res;
        this.comments=res.Comments;

      },
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
  addComment(value){
    console.log(value)
    if(localStorage.getItem('currentUser')==undefined){
      this.showSuccess('Please login before comment')
    }else{
    this._event.postComment(this.postid, value).subscribe((res)=>{

console.log(res);

      this.ngOnInit();
      console.log("loaded");
      this.cmt.get('Comment').setValue('');
    })
  }
  }
  showSuccess(message:String) {
    this.toastr.warning(message.toString(), "Please Login");
   }
   deleteComment(value){
    var commentData={
      postid:this.postid,
      commentid:value
    }
    this._event.deleteComment(commentData).subscribe(rr=>{
      this.ngOnInit();
    })
    console.log(commentData);
   }
   checkUser(udi){
     return !(localStorage.getItem('currentUser')==udi);
   }
}
