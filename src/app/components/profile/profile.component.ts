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

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UsersService,
      private authenticationService:AuthenticationService) {}

    ngOnInit() {
      this.user = this.authenticationService.getUser();
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
      this.usersService.editProfile(this.user).subscribe(data=>{
         console.log(data.data);
         this.authenticationService.setUser(this.user);
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
