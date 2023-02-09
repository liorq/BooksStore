import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/app.interfaces';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from '../../service/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
isUserLogged?:boolean;
currentUser?:user;
constructor(public userInfoSvc:UserInfoService,public localSvc:LocalService,public router:Router){}

ngOnInit(){

this.userInfoSvc.currentUser.subscribe((user:any)=>{
this.currentUser=user;
})

  this.userInfoSvc.isUserLogged.subscribe((isUserLogged:any)=>{
   this.isUserLogged=isUserLogged;
  })

  if(this.localSvc.isUserLogged())
    this.userInfoSvc.isUserLogged.next(true)

}

deleteUserInfo() {
  this.localSvc.deleteUserInfo();
  this.userInfoSvc.isUserLogged.next(false);
}
}
