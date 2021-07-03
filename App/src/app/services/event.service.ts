import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public _eventUrl="http://localhost:3000/events";
  public _specialeventUrl="http://localhost:3000/special";

  constructor(
    public _http:HttpClient
  ) { }

  getEvents():Observable<any>{
    localStorage.setItem('login','yes')
    return this._http.get<any>(this._eventUrl)


  }
  getSpecialEvent():Observable<any>{
    return this._http.get<any>(this._specialeventUrl)
  }
}
