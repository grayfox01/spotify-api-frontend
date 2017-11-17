import { Component ,OnInit,OnDestroy} from '@angular/core';
import { SocketService } from './services/socket.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  socketid:string;

  constructor(
      private socketService:SocketService,
      private authenticationService:AuthenticationService) {}

    ngOnInit() {
      if(this.authenticationService.getUser()){
        this.socketService.connect();
      }
      this.socketService.getEvent("connected").subscribe(data=>{
         console.log(data);
      });
      this.socketService.getEvent("refresh_token").subscribe((data:string)=>{
         localStorage.setItem('token', data );
      });
    }

    ngOnDestroy(){
      this.socketService.close();
    }
}
