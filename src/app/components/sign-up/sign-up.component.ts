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
  ngOnInit(){
    this.initForm()
    this.booksService.usersData=JSON.parse(this.localService.getLocalProperty('usersData')||"[]")

    this.userInfoService.isGuestUser.subscribe(()=>{
      if(!this.localService.isUserLogged())
       this.CreateGuestUser()
    })
  }
  constructor(public userInfoService:UserInfoService,private booksService:BooksService,private router:Router,public localService:LocalService){}
  subscribeForm!: FormGroup;
  errorMessages=messages.errorMessages


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


  CreateGuestUser(){
    const uniqueEmail ='guest'+ uuidv4()+'@gmail.com';
    const newGuestUser={
      email: uniqueEmail,
      password: '12345678',
      booksInCart: [],
      typeOfUser:'guest',
    }
    this.newUserProcess(newGuestUser)

  }

  CreateUserProfile(){
  const newUser:any={ ...this.subscribeForm.value };
  const isUserNameAvailable =
  this.userInfoService.isUserAvailable(
    newUser,
    this.booksService.usersData
  );

  Swal.fire(messages[!isUserNameAvailable?'usernameIsntAvailable':'usernameAdded'])

  if (!isUserNameAvailable)
    return;

  this.newUserProcess(newUser)
}

newUserProcess(newUser:user){
  this.addNewUserPropertyToLocalService(newUser)
  this.userInfoService.isUserLogged.next(true)
  console.log(newUser.email)
  this.router.navigate([`users/${newUser.email+"/"+(newUser.typeOfUser=='admin'?'admin':'allBooks')}`])
}

addNewUserPropertyToLocalService(newUser:any){
    this.booksService.usersData.push({
      email: newUser.email,
      password: newUser.password,
      booksInCart: this.localService.getBooksInCarts()||[],
      typeOfUser:newUser.typeOfUser,
    });
    this.localService.setLocalProperty('index',this.booksService.usersData.length-1)
    this.localService.setLocalProperty("currentUserName",newUser.email)
    this.localService.setLocalProperty('usersData',JSON.stringify([...this.booksService.usersData]));
}
}
