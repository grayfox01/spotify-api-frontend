import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {
  private BASE_URL: string = 'http://localhost:3000/v1/auth';

  constructor(public http: Http,public router:Router) { }

  login(user:any){
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url,user).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  singUp(user:any){
    let url: string = `${this.BASE_URL}/signup`;
    return this.http.post(url,user).map((response: Response) => {
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

  isAuthed(){
    return (localStorage.getItem('user')!= undefined && localStorage.getItem('user')!= null)? true:false;
  }

}
