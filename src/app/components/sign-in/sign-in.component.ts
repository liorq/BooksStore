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


ngOnInit(){
  this.localService.initialLocalStorageToDefault();
}


SignInHandler() {
   const isValidInfo = this.localService.isValidUserInfo(this.userName,this.Password);
  if (isValidInfo)
  this.signIn()

  else
  Swal.fire(messages.usernameIncorrect);
}


signIn(){
    this.localService.signIn(this.userName);
    const currentUser:any=this.localService.getUserObj();
    this.userInfoService.updateCurrentUser(currentUser);
    this.router.navigate([`users/${this.userName+"/"+(currentUser?.typeOfUser=='admin'?'admin':'allBooks')}`])
}

}
