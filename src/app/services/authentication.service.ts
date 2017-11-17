import { Injectable,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import { UsersService } from './users.service';
import { SocketService } from './socket.service';

@Injectable()
export class AuthenticationService {

  private BASE_URL: string = 'http://localhost:3000/v1/auth';

  constructor(
    public http: HttpClient,
    public router:Router,
    public usersService:UsersService,
    public socketService:SocketService) {

    }

  ngOnInit(){

  }

  login(token:any){
    localStorage.setItem('token',token);
    this.socketService.connect();
    this.usersService.getProfile().subscribe((data:any)=>{
      localStorage.setItem('user',JSON.stringify(data));
    },(error:any)=>{
      console.log(error);
    });
    this.router.navigate(['/home']);
  }

  logOut(){
    localStorage.clear();
    this.socketService.close();
    this.router.navigate(['/home']);
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

}
