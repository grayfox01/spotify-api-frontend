import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from './../../services/playlists.service'

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {

  public playlists:any = [];

  constructor(
    public playlistsService:PlaylistsService) { }

  ngOnInit() {
    this.playlistsService.getAll().subscribe(data=>{
      this.playlists = data.data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
