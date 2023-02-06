import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  getEditUserForm, verifyDelete, verifyPassword } from 'src/app/app.forms';
import { user } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: [
    '../books-list/books-list.component.css',
    './my-settings.component.css',
  ],
})
export class MySettingsComponent implements OnInit{
  currentUser:any;

  constructor(
    public router: Router,
    public localService: LocalService,
    private userInfoService: UserInfoService,
    private booksService: BooksService
  ) {}
  ngOnInit(): void {
   this.currentUser=this.localService.getUserObj();
   this.booksService.usersData=JSON.parse(this.localService.getLocalProperty('usersData')||"[]")
  }


   async isUserConfirmedDelete(userPassword: string) {
    return await verifyPassword(userPassword)&&await verifyDelete()
   }


  async deleteUserHandler() {

    const isUserConfirmedDelete: any = await this.isUserConfirmedDelete(this.currentUser.password)
    if (isUserConfirmedDelete) {
      this.deleteUser();
      this.userInfoService.isUserLogged.next(false);
      this.router.navigate(['/SignIn']);
    }

  }

 deleteUser(){
      this.localService.deleteUser(
      this.localService.getLocalProperty('currentUserName'));
      this.localService.deleteUserInfo();
 }


  async VerifyPassword(){
    const form = getEditUserForm(this.currentUser, 'Edit user details', 'user');
    const { value: formValues } = await Swal.fire(form);
    const isValidateForm = formValues![1] == this.currentUser.password && formValues;
    return isValidateForm ?formValues:false
  }


  UpdateUserPassword(currentUser:user,form:any){
    currentUser.password = form[2];
    const index: any = this.localService.getLocalProperty('index');
    this.booksService.usersData[index] = currentUser;
    this.localService.setLocalProperty(
      'usersData',
      JSON.stringify(this.booksService.usersData)
    );
  }

  async VerifyAndUpdateUserPasswordHandler() {
     const form:any=await this.VerifyPassword();

    if (form)
    this.UpdateUserPassword(this.currentUser,form)

    Swal.fire(
      messages[form ? 'changeSuccessfully' : 'passwordIncorrect']
    );
  }
}


