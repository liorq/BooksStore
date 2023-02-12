import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css','../sign-in/sign-in.component.css']
})
export class SignUpComponent  implements OnInit{

  isUserLogged?:boolean=this.userInfoService.isUserLogged.getValue()||this.localService.isUserLogged()
   currentUser?:user;
  subscribeForm!: FormGroup;
  errorMessages=messages.errorMessages;


  ngOnInit(){
    this.initForm()
    if(!this.isUserLogged)
    this.CreateGuestUserHandler()
  }

  constructor(public userInfoService:UserInfoService
    ,private booksSvc:BooksService
    ,private router:Router,
    private localService:LocalService){}

  initForm() {
    this.subscribeForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      typeOfUser: new FormControl('', [Validators.required]),
    });

  }

  get Name(){return this.subscribeForm.get('name');}
  get Email(){return this.subscribeForm.get('email');}
  get Password(){return this.subscribeForm.get('password');}
  get TypeOfUser(){return this.subscribeForm.get('typeOfUser');}


  CreateGuestUserHandler(){

    const uniqueEmail ='guest'+ uuidv4()+'@gmail.com';
    const newGuestUser={
      email: uniqueEmail,
      password: '12345678',
      booksInCart: [],
      typeOfUser:'guest',
    }
    this.booksSvc.updateCurrentBooks([])
    this.newUserProcess(newGuestUser)
  }

  SignUpHandler(){
  const newUser:user={ ...this.subscribeForm.value };
  const isUserNameAvailable =this.localService.isUserNameAvailable(newUser);
  Swal.fire(messages[!isUserNameAvailable?'usernameIsntAvailable':'usernameAdded'])

  if (!isUserNameAvailable)
    return;

  this.newUserProcess(newUser)

  const path:string=(newUser.typeOfUser=='admin'?'admin':'allBooks')
  if(newUser.typeOfUser!=='guest')
  this.router.navigate([`users/${newUser.email}/${path}`])
}

newUserProcess(newUser:user){
  this.localService.addNewUser(newUser)
  this.userInfoService.updateCurrentUser(newUser)
  this.booksSvc.updateCurrentBooks(newUser.booksInCart)
}


}
