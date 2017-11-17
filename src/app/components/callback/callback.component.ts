import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params.token && params.state && sessionStorage.getItem('state') &&  params.state == sessionStorage.getItem('state')){
        this.authenticationService.login(params.token);
      }else{
        this.router.navigate(["/restricted"]);
      }
    });
  }

}
