import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/retry';

@Injectable()
export class PlaylistsService {

  private BASE_URL: string = 'http://localhost:3000/v1/playlists';

  constructor(
    public http: HttpClient,
    public router:Router,
    public authenticationService:AuthenticationService
  ) { }

  getAll(){
    let url: string = `${this.BASE_URL}`;
    const req = new HttpRequest('GET',url, { headers: this.getHeaders(), reportProgress: true});
    return this.http.request(req);
  }

  getId(id:string){
    let url: string = `${this.BASE_URL}/${id}`;
    const req = new HttpRequest('GET',url, { headers: this.getHeaders(), reportProgress: true});
    return this.http.request(req);
  }

  getTracks(id){
    let url: string = `${this.BASE_URL}/${id}/tracks`;
    const req = new HttpRequest('GET',url, { headers: this.getHeaders(), reportProgress: true});
    return this.http.request(req);
  }

  removeRepeatedsTracks(id,snapshot_id,positions:any){
    let body = {
      snapshot_id:snapshot_id,
      positions : positions
    };
    let url: string = `${this.BASE_URL}/${id}/tracks`;
    const req = new HttpRequest('DELETE',url, { headers: this.getHeaders(body), reportProgress: true});
    return this.http.request(req);
  }

  getHeaders(body:any = undefined){
    let headers;
    if(body){
      headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
     .set('Content-Type', 'application/json')
     .set('body', JSON.stringify(body));
    }else{
      headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
     .set('Content-Type', 'application/json');
    }
    return headers;
  }

}
