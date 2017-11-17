import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from "socket.io-client";
import 'rxjs/add/operator/map'

@Injectable()
export class SocketService {
  public socket:any;

  constructor() { }

  connect(){
    //let url = window.location.protocol+'//'+window.location.hostname+((window.location.port)?':'+window.location.port:'');
    let url =`http://localhost:3000?token=${localStorage.getItem('token')}`;
    this.socket = io(url);
    this.socket.on('error', function(err) {
      console.log(err);
    });
  }

  getSocket(){
    return this.socket;
  }

  getEvent(eventType:string){
    let event = new Observable(observer => {
      this.socket.on(eventType, function (data) {  observer.next(data); });
    });
    return event;
  }

  sendMessage(type:string,data:any){
    this.socket.emit(type,data);
  }

  close() {
    this.socket.disconnect();
  }

}
