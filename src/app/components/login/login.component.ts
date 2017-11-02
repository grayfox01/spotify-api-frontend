import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { UsersService } from './../../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.id &&
        params.token) {
        this.usersService.profile(params.id, params.token).subscribe(data => {
           if(data.error == false){
             console.log(data);
             localStorage.setItem("user",JSON.stringify({id:data.data.id,token:params.token}));
             this.router.navigate(["/home"]);
           }else{
             console.log(data);
           }
        }, error => {

        });
      }
    });
  }

  login() {
    this.authenticationService.login(this.user).subscribe(data => {
      if (data.error) {
        console.log(data);
      } else {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.data));
        this.router.navigate(['/home']);
      }
    }, error => {
      console.log(error);
    });
  }

}
