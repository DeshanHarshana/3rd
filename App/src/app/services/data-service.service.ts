import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public _profileUrl="http://localhost:3000/profile/";
  public _updateProfileDetails="http://localhost:3000/update/"+localStorage.getItem('currentUser');
  public _postLink="";
  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

   getUserData(id){
    console.log("data service " + id);
    return this._http.get(this._profileUrl+id);
  }
  updateProfileDetails(details){
    return this._http.put<any>(this._updateProfileDetails, details);
  }
  postPost(posts){
    console.log("Post data " + posts)

    return this._http.post<any>("http://localhost:3000/addpost", posts);
  }
  getPost(id){
    return this._http.get<any>("http://localhost:3000/getPost/"+id);
  }
}
