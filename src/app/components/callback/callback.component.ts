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
      if(params){
        this.usersService.verifyProfile(params).subscribe(data => {
           if(data.error == false){
             console.log(data);
             this.authenticationService.login(params);
           }else{
             this.router.navigate(["/restricted"]);
           }
        }, error => {

        });
      }
    });
  }

}
