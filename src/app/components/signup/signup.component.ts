import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { UsersService } from './../../services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user: any = {};
  public loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      if (data.id &&
          data.country &&
          data.display_name &&
          data.email &&
          data.uri &&
          data.access_token &&
          data.refresh_token) {
          this.user.id = data.id;
          this.user.country = data.country;
          this.user.display_name = data.display_name;
          this.user.email = data.email;
          this.user.uri = data.uri;
          this.user.access_token = data.access_token;
          this.user.refresh_token = data.refresh_token;
      }else{
        console.log("data required not found");
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {

  }

  signUp() {
    this.authenticationService.singUp(this.user).subscribe(data => {
      console.log(data);
      if (data.error) {
      } else {
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log(error);
    });
  }
}
