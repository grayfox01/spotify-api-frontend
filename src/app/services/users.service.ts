import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject }    from 'rxjs/Subject';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class UsersService {

  private BASE_URL: string = 'http://localhost:3000/v1/users';

  constructor(public http: Http,public router:Router,public authenticationService:AuthenticationService) { }

  getProfile(){
    let user = this.authenticationService.getUser();
    let url: string = `${this.BASE_URL}/${user.id}`;
    return this.http.get(url,{ headers: this.getHeaders(user) }).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  verifyProfile(user){
    let url: string = `${this.BASE_URL}/${user.id}`;
    return this.http.get(url,{ headers: this.getHeaders(user)}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  editProfile(data){
    let user = this.authenticationService.getUser();
    let url: string = `${this.BASE_URL}/`;
    return this.http.put(url,data,{ headers: this.getHeaders(user)}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  deleteProfile(){
    let user = this.authenticationService.getUser();
    let url: string = `${this.BASE_URL}/${user.id}`;
    return this.http.delete(url,{ headers: this.getHeaders(user)}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  getHeaders(user:any){
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${user.token}`
    });
    return headers;
  }
}
