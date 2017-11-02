import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PlaylistsService {

  private BASE_URL: string = 'http://localhost:3000/v1/playlists';

  constructor(public http: Http,public router:Router) { }

  getAll(){
    let user = JSON.parse(localStorage.getItem('user'));
    let url: string = `${this.BASE_URL}/userId/${user.id}`;
    return this.http.get(url,{ headers: this.getHeaders()}).map((response: Response) => {
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
