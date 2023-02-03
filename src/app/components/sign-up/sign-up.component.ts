import { Component, OnInit } from '@angular/core';
import {   FormGroup,
  FormControl,
  Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css','../sign-in/sign-in.component.css']
})
export class SignUpComponent  implements OnInit{
  ngOnInit(){
    this.initForm()
    this.booksService.usersData=JSON.parse(this.localService.getLocalProperty('usersData')||"[]")

  }
  constructor(public userInfoService:UserInfoService,private booksService:BooksService,private router:Router,private localService:LocalService){}
  subscribeForm!: FormGroup;
  name: any;
  email: any;
  password: any;
  errorMessages=messages.errorMessages
  typeOfUser:any;

  initForm() {
    this.subscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      typeOfUser: new FormControl('', [Validators.required]),
    });

    this.name = this.subscribeForm.get('name');
    this.email = this.subscribeForm.get('email');
    this.password = this.subscribeForm.get('password');
    this.typeOfUser=this.subscribeForm.get('typeOfUser');
  }

  CreateUserProfile(){
  const newUser:any={ ...this.subscribeForm.value };
  const isUserNameAvailable =
  this.userInfoService.isUserAvailable(
    newUser,
    this.booksService.usersData
  );
  if (!isUserNameAvailable){
    Swal.fire(messages.usernameIsntAvailable)
    return;
  }

  this.addNewUserPropertyToLocalService(newUser)
  this.userInfoService.isUserLogged.next(true)
  Swal.fire(messages.usernameAdded);
  this.router.navigate([`/${newUser.typeOfUser=='admin'?'admin':'allBooks'}`])

}

addNewUserPropertyToLocalService(newUser:any){

    this.booksService.usersData.push({
      email: newUser.email,
      password: newUser.password,
      booksInCart: [],
      typeOfUser:newUser.typeOfUser,
    });
    this.localService.setLocalProperty('index',this.booksService.usersData.length-1)
    this.localService.setLocalProperty("currentUserName",newUser.email)
    this.localService.setLocalProperty('usersData',JSON.stringify([...this.booksService.usersData]));
}
}
