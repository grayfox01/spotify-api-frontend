import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './../../services/playlists.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    public playlist:any;

    constructor(
      public playlistsService:PlaylistsService,
      private route: ActivatedRoute,
      public sanitizer: DomSanitizer,
      private usersService: UsersService,
      private authenticationService:AuthenticationService
    ) { }

    ngOnInit() {
      this.playlistsService.getId(this.route.snapshot.paramMap.get('id')).subscribe(data=>{
        if(data.refresh_user){
          this.usersService.getProfile().subscribe(data=>{
            this.authenticationService.setUser(data.data);
          });
        }
        this.playlist = data.data;
      },error=>{
        console.log(error);
      });
    }

    isRepeated(item:any){
      let size = 0;
      for (let i in this.playlist.tracks.items) {
        let itemC = this.playlist.tracks.items[i];
        if(item.track.id == itemC.track.id){
          size = size + 1;
        }
      }
      return size > 1;
    }

    getReapeted(item){
      let position = [];
      for (let i in this.playlist.tracks.items) {
        let itemC = this.playlist.tracks.items[i];
        if(item.track.id == itemC.track.id){
          position.push(Number(i));
        }
      }
      if(position.length > 1){
        position.splice(0,1);
        return { "uri": item.track.uri, "positions": position };
      }else{
        return null;
      }
    }

    getAllRepeated(){
      let repeateds = [];
      let copy  = Object.assign([], this.playlist.tracks.items);
      while(copy.length > 0){
         let search = this.getReapeted(copy[0]);
         if( search != null){
           repeateds.push(search);
         }
         //copy = copy.filter(function (itemC){return copy[0].track.id == itemC.track.id;});
         for (let i in copy) {
           if(copy[0].track.id == copy[i].track.id){
              copy.splice(i,1);
           }
         }

      }
      return repeateds;
    }

    removeRepeatedsTracks(){
      this.playlistsService.removeRepeatedsTracks(this.playlist.id,this.getAllRepeated()).subscribe(data=>{
        console.log(!data.error);
        if(data.refresh_user){
          this.usersService.getProfile().subscribe(data=>{
            this.authenticationService.setUser(data.data);
          });
        }
        if(!data.error){
          this.playlistsService.getId(this.route.snapshot.paramMap.get('id')).subscribe(data=>{
            this.playlist = data.data;
          },error=>{
            console.log(error);
          });
        }
      },error=>{
        console.log(error);
      })
    }

    removeTrack(item:any,position:number){
      this.playlistsService.removeRepeatedsTracks(this.playlist.id,[{ "uri": item.track.uri, "positions": [position] }]).subscribe(data=>{
        if(data.refresh_user){
          this.usersService.getProfile().subscribe(data=>{
            this.authenticationService.setUser(data.data);
          });
        }
        console.log(!data.error);
        if(!data.error){
          this.playlistsService.getId(this.route.snapshot.paramMap.get('id')).subscribe(data=>{
            this.playlist = data.data;
          },error=>{
            console.log(error);
          });
        }
      },error=>{
        console.log(error);
      })
    }

}
