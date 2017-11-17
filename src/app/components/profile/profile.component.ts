import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';
import { SocketService } from './../../services/socket.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public edit:boolean = false;
  public user:any;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UsersService,
      private authenticationService:AuthenticationService,
      private socketService:SocketService) {}

    ngOnInit() {
      this.user = this.authenticationService.getUser();
      this.socketService.getEvent("refresh_user").subscribe((data:any)=>{
        if(this.edit == false){
          this.usersService.getProfile().subscribe(data=>{
            this.authenticationService.setUser(data);
            this.user = this.authenticationService.getUser();
          })
        }
      });
    }

    ngOnDestroy() {

    }

    editar(){
      this.edit = true;
    }

    eliminar(){
      this.usersService.deleteProfile().subscribe((data:any)=>{
         this.authenticationService.logOut();
      },error=>{
         console.log(error);
      });
    }

    guardar(){
      this.usersService.editProfile(this.user).subscribe((data:any)=>{
         this.authenticationService.setUser(this.user);
         this.user = this.authenticationService.getUser();
         this.edit = false;
      },error=>{
         console.log(error);
      });
    }

    cancelar(){
      this.edit = false;
      this.user = this.authenticationService.getUser();
    }

}
