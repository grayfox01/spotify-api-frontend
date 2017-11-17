import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './../../services/playlists.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from './../../services/users.service';
import { SocketService } from './../../services/socket.service';
import { AuthenticationService } from './../../services/authentication.service';
import { HttpEventType,HttpResponse} from '@angular/common/http';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    public playlist:any;
    public tracks = [];
    public repeateds = [];
    public loading:boolean = false;
    public error:any;
    constructor(
      public playlistsService:PlaylistsService,
      private route: ActivatedRoute,
      public sanitizer: DomSanitizer,
      private usersService: UsersService,
      private authenticationService:AuthenticationService,
      public ngProgress: NgProgress,
      private socketService:SocketService
    ) { }

    ngOnInit() {

      this.init();
      this.socketService.getEvent("refresh_playlist").subscribe((data:any)=>{
        if(this.playlist && data.id == this.playlist.id && this.loading == false){
          this.init();
        }
      });
    }

    init(){
      this.ngProgress.start();
      this.loading = true;
      this.playlistsService.getId(this.route.snapshot.paramMap.get('id')).subscribe( event => {
        if (event instanceof HttpResponse) {
          let body:any = event.body;
            this.ngProgress.done();
            this.loading = false;
            this.playlist = event.body;
        }
      },error => {
          this.ngProgress.done();
          this.error = error.error;
          this.loading = false;
      });
    }

    removeRepeatedsTracks(){
      this.playlistsService.removeRepeatedsTracks(this.playlist.id,this.playlist.snapshot_id,this.playlist.tracks.repeateds).subscribe(event=>{
        if (event instanceof HttpResponse) {
          let body:any = event.body;
            this.ngProgress.done();
            console.log(body);
        }
      },error => {
          this.error = error.error;
          this.loading = false;
      });
    }

    removeTrack(item:any){
      this.playlistsService.removeRepeatedsTracks(this.playlist.id,this.playlist.snapshot_id,[item.position]).subscribe(event=>{
        if (event instanceof HttpResponse) {
            let body:any = event.body;
            console.log(body);
        }
      },error => {
          this.error = error.error;
          this.loading = false;
      });
    }

}
