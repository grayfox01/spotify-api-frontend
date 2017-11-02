import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './../../services/playlists.service'
import { UsersService } from './../../services/users.service'

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {

  public playlists:any = [];

  constructor(
    public playlistsService:PlaylistsService,
    public usersService:UsersService) { }

  ngOnInit() {
    this.playlistsService.getAll().subscribe(data=>{
      this.playlists = data.data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
