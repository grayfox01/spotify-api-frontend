import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user:any = {};
  public edit:boolean;
  public newPassword:string;
  public editPassword:boolean;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UsersService,
      private authenticationService:AuthenticationService) {}

    ngOnInit() {
      this.init();
    }

    ngOnDestroy() {

    }

    editar(){
      this.edit = true;
    }

    eliminar(){
      this.usersService.deleteProfile().subscribe(data=>{
         console.log(data.data);
         this.authenticationService.logOut();
      },error=>{
         console.log(error);
      });
    }

    guardar(){
      if(this.editPassword){
        this.user.password = this.newPassword;
      }
      this.usersService.editProfile(this.user).subscribe(data=>{
         console.log(data.data);
         this.init();
      },error=>{
         console.log(error);
      });
    }

    init(){
      this.edit = false;
      this.editPassword = false;
      this.newPassword = null;
      let user = JSON.parse(localStorage.getItem('user'));
      this.usersService.profile(user.id,user.token).subscribe(data=>{
         console.log(data);
         this.user = data.data;
      },error=>{
         console.log(error);
      });
    }

}
