import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './../../services/playlists.service'
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {

  public playlists:any = [];

  constructor(
    public playlistsService:PlaylistsService,
    private usersService: UsersService,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.playlistsService.getAll().subscribe(data=>{
      if(data.refresh_user){
        this.usersService.getProfile().subscribe(data=>{
          this.authenticationService.setUser(data.data);
        });
      }
      this.playlists = data.data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
