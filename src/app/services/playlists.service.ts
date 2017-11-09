import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject }    from 'rxjs/Subject';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PlaylistsService {

  private BASE_URL: string = 'http://localhost:3000/v1/playlists';

  constructor(public http: Http,public router:Router,public authenticationService:AuthenticationService) { }

  getAll(){
    let user = this.authenticationService.getUser();
    let body:any = {};
    body.id = user.id;
    body.access_token = user.access_token;
    body.refresh_token = user.refresh_token;
    let url: string = `${this.BASE_URL}`;
    return this.http.get(url,{ headers: this.getHeaders(user,body)}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  getId(id:string){
    let user = this.authenticationService.getUser();
    let body:any = {};
    body.id = user.id;
    body.access_token = user.access_token;
    body.refresh_token = user.refresh_token;
    let url: string = `${this.BASE_URL}/${id}`;
    return this.http.get(url,{ headers: this.getHeaders(user,body)}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  removeRepeatedsTracks(id,tracks:any){
    let user = this.authenticationService.getUser();
    let body:any = {};
    body.id = user.id;
    body.access_token = user.access_token;
    body.refresh_token = user.refresh_token;
    body.tracks = tracks;
    let url: string = `${this.BASE_URL}/${id}/tracks`;
    return this.http.delete(url,{ headers: this.getHeaders(user,body)}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  getHeaders(user:any,body:any){
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${user.token}`,
       body: JSON.stringify(body)
    });
    return headers;
  }

}
