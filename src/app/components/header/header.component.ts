import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/app.interfaces';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from '../../service/user-info.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  isUserLogged?:boolean=
   this.userInfoSvc.isUserLogged.getValue()
  ||this.localSvc.isUserLogged()

currentUser?:user;
constructor(private userInfoSvc:UserInfoService,private localSvc:LocalService,private router:Router,private booksSvc:BooksService){}

ngOnInit(){

  this.userInfoSvc.isUserLogged.subscribe((isUserLogged:boolean|null)=>{
   this.isUserLogged=isUserLogged||this.localSvc.isUserLogged();
  })
   this.userInfoSvc.currentUser.subscribe((user:user|null)=>{
    this.currentUser=user||this.localSvc.getUserObj()
    })
}

deleteUserInfo() {
  this.userInfoSvc.deleteUserInfo()
  this.localSvc.deleteUserInfo();
  this.booksSvc.updateCurrentBooks([])
}
updateIsGuestUser(){
  if(!this.isUserLogged)
 this.userInfoSvc.updateSubject(this.userInfoSvc.isGuestUser,true)
}

}
