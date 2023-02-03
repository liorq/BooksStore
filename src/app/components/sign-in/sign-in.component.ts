import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit{
 constructor(private router:Router,private userInfoService:UserInfoService,private localService:LocalService,private booksService:BooksService){}
userName: string="";
Password: string="";
usersData:any;
ngOnInit(){
  this.localService.initialLocalStorageToDefault()
  this.usersData=JSON.parse(this.localService.getLocalProperty('usersData')||"[]")
}

isValidUserInfo() {
   const isValidInfo = this.userInfoService.isValidUserInfo(
    this.userName,
    this.Password,
    this.usersData
   );

  if (isValidInfo) {
    this.userInfoService.isUserLogged.next(true)
    this.localService.setLocalProperty("currentUserName",this.userName)
    this.updateIndex(this.userName)
    this.router.navigate([`/${this.localService.getUserObj().typeOfUser=='admin'?'admin':'allBooks'}`])
  }
  else
  Swal.fire(messages.usernameIncorrect);
}

updateIndex(userName:any){
  const index = this.usersData.findIndex((user:user) => user.email == userName);
  this.localService.setLocalProperty("index",index)
}
}
