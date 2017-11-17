import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    sessionStorage.setItem('state','spotifyApi');
    window.location.href = 'http://localhost:3000/v1/auth/authorize'; 
  }

  logOut(){
    this.authenticationService.logOut();
  }

  getUser(){
    return this.authenticationService.getUser();
  }

}
