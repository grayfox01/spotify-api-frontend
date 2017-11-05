import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

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
             this.router.navigate(["/restricted"]);
           }
        }, error => {

        });
      }
    });
  }

}
