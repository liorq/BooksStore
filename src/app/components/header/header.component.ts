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
constructor(public userInfoService:UserInfoService,public localService:LocalService){}

ngOnInit(){

  this.userInfoService.isUserLogged.subscribe((isUserLogged)=>{
   this.isUserLogged=isUserLogged;
  })
  
  if(this.localService.isUserLogged()){
    this.userInfoService.isUserLogged.next(true)
  }
}

deleteUserInfo() {
  this.localService.deleteUserInfo();
  this.userInfoService.isUserLogged.next(false);
}
}
