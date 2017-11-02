import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UsersService {

  private BASE_URL: string = 'http://localhost:3000/v1/users';

  constructor(public http: Http,public router:Router) { }

  profile(id,token){
    let url: string = `${this.BASE_URL}/${id}`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`
    });
    return this.http.get(url,{headers: headers}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  editProfile(user){
    let url: string = `${this.BASE_URL}/`;
    return this.http.put(url,user,{headers: this.getHeaders()}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  deleteProfile(){
    let user = JSON.parse(localStorage.getItem('user'));
    let url: string = `${this.BASE_URL}/${user.id}`;
    return this.http.delete(url,{headers: this.getHeaders()}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }


    getHeaders(){
      let token = JSON.parse(localStorage.getItem('user')).token;
      let headers: Headers = new Headers({
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
      });
      return headers;
    }
}
