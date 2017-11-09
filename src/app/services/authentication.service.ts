import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

  constructor(public http: Http,public router:Router) { }

  login(user:any){
    this.setUser(user);
    this.router.navigate(['/home']);
  }

  setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  getUser(){
    let user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user);
    }else{
      return undefined;
    }
  }

}
