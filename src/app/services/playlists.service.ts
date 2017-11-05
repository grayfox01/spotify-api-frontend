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
    let url: string = `${this.BASE_URL}/userId/${user.id}/playlists`;
    return this.http.get(url,{ headers: this.getHeaders()}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  getId(id:string){
    let user = JSON.parse(localStorage.getItem('user'));
    let url: string = `${this.BASE_URL}/userId/${user.id}/playlists/${id}`;
    return this.http.get(url,{ headers: this.getHeaders()}).map((response: Response) => {
      try {
        return response.json() || response.status;
      } catch (e) {
        return response.status;
      }
    });
  }

  removeRepeatedsTracks(id,tracks:any){
    let user = JSON.parse(localStorage.getItem('user'));
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${user.token}`,
       body: JSON.stringify({ tracks: tracks })
    });
    console.log(tracks);
    let url: string = `${this.BASE_URL}/userId/${user.id}/playlists/${id}/tracks`;
    return this.http.delete(url,{ headers: headers}).map((response: Response) => {
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
