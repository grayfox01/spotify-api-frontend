import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './../../services/playlists.service'
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {

  public playlists: any;
  public error:any;
  constructor(
    public playlistsService: PlaylistsService,
    public usersService: UsersService,
    public authenticationService: AuthenticationService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.ngProgress.start();
    this.init();
  }


  init(){
    this.playlistsService.getAll().subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        let progress = Math.round(event.loaded / event.total);
        this.ngProgress.set(progress);
      } else if (event instanceof HttpResponse) {
        this.ngProgress.done();
        this.playlists = event.body;
      }
    },error => {
        console.log(error);
        this.ngProgress.done();
        if(error.error.status== 401){
        
        }
        this.error = error.error;
    });
  }

}
