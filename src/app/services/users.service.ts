import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';


@Injectable()
export class UsersService {

  private BASE_URL: string = 'http://localhost:3000/v1/users';

  constructor(public http: HttpClient,public router:Router) { }

  getProfile(){
    let url: string = `${this.BASE_URL}/me`;
    return this.http.get(url,{ headers: this.getHeaders()});
  }

  editProfile(data){
    let url: string = `${this.BASE_URL}/me`;
    return this.http.put(url,data,{ headers: this.getHeaders()});
  }

  deleteProfile(){
    let url: string = `${this.BASE_URL}/me`;
    return this.http.delete(url,{ headers: this.getHeaders()});
  }

  getHeaders(){
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    .set('Content-Type', 'application/json');
    return headers;
  }
}
