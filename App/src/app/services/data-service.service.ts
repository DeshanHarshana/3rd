import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  public _postLink="";
  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

   getUserData(id){
    console.log("data service " + id);
    return this._http.get("http://localhost:3000/profile/"+id);
  }
  updateProfileDetails(details){
    return this._http.put<any>("http://localhost:3000/update/"+localStorage.getItem('currentUser'), details);
  }
  postPost(posts){
    console.log("Post data " + posts)

    return this._http.post<any>("http://localhost:3000/addpost", posts);
  }
  getPosts(id):Observable<any>{
    return this._http.get<any>("http://localhost:3000/getPosts/"+id);
  }
  getPost(id):Observable<any>{
    return this._http.get<any>("http://localhost:3000/getPost/"+id);
  }
  updatePost(id, post){
    return this._http.put<any>("http://localhost:3000/update-post/"+id, post);
  }
  deletePost(id){
    return this._http.delete("http://localhost:3000/delete-post/"+id);
  }
  postImage(id,image:any){

    return this._http.post<any>("http://localhost:3000/post/"+id+"/uploadPhoto", image);
  }
  getAllPosts(){
    return this._http.get<any>("http://localhost:3000/getAllPost/");
  }
  postComment(id, comment){
    return this._http.put<any>("http://localhost:3000/updatecomment/"+id,comment);
  }
  deleteComment(value){
    return this._http.put<any>("http://localhost:3000/deletecomment", value);
  }
  getSpecificPost(value){
    return this._http.get<any>("http://localhost:3000/getSpecificPost/"+value);
  }
}
