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
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public userName: string = '';
  public password: string = '';
  private currentUser?:user;

  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    private localService: LocalService,

  ) {}

  ngOnInit() {
    this.localService.initialLocalStorageToDefault();
  }

  SignInHandler() {
    const isValidInfo = this.localService.isValidUserInfo(
      this.userName,
      this.password
    );

   if (isValidInfo){
     this.signIn();
     const path =  this.currentUser?.typeOfUser == 'admin' ? 'admin' : 'allBooks';
     this.router.navigate([`users/${this.userName}/${path}`]);
    }

    else
    Swal.fire(messages.usernameIncorrect);
    console.log(this.currentUser)

  }

  signIn() {
    this.localService.signIn(this.userName);
    this.currentUser= this.localService.getUserObj();
    this.userInfoService.updateCurrentUser(this.currentUser);
  }
}
