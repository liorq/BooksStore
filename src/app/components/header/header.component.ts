import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from '../../service/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isUserLogged?:boolean;
constructor(public userInfoSvc:UserInfoService,public localSvc:LocalService){}

ngOnInit(){

  this.userInfoSvc.isUserLogged.subscribe((isUserLogged)=>{
   this.isUserLogged=isUserLogged;
  })

  if(this.localSvc.isUserLogged()){
    this.userInfoSvc.isUserLogged.next(true)
  }
}

deleteUserInfo() {
  this.localSvc.deleteUserInfo();
  this.userInfoSvc.isUserLogged.next(false);
}
}
