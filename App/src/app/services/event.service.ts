import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public _eventUrl="http://localhost:3000/events";
  public _specialeventUrl="http://localhost:3000/special";

  constructor(
    public _http:HttpClient
  ) { }

  getEvents(){
    localStorage.setItem('login','yes')
    return this._http.get<any>(this._eventUrl)


  }
  getSpecialEvent(){
    return this._http.get<any>(this._specialeventUrl)
  }
}
