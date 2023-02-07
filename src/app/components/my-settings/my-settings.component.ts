import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getEditUserForm,
  verifyDelete,
  verifyPassword,
} from 'src/app/app.forms';
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
export class MySettingsComponent implements OnInit {
  currentUser?: any;
  isUserLogged?:boolean;
  ///לשנות לtype



  constructor(
    public router: Router,
    public localSvc: LocalService,
    private userInfoSvc: UserInfoService,
    private booksSvc: BooksService
  ) {}

  ngOnInit(): void {
    this.userInfoSvc.currentUser.subscribe((currentUser)=>{
      this.currentUser=currentUser
    })

////
////

    //not needed
      this.currentUser = this.localSvc.getUserObj();
      // don't need usersData
      this.booksSvc.usersData = this.localSvc.getLocalProperty('usersData');
  }

  async isUserConfirmedDelete(userPassword: string) {
    return (await verifyPassword(userPassword)) && (await verifyDelete());
  }

  async deleteUserHandler() {
    const isUserConfirmedDelete: any = await this.isUserConfirmedDelete(
      this.currentUser.password
    );
    if (isUserConfirmedDelete) {
      this.deleteUser();
      this.userInfoSvc.isUserLogged.next(false);
      this.router.navigate(['/SignUp']);
    }
  }

  deleteUser() {
    this.localSvc.deleteUser(this.localSvc.getLocalProperty('currentUserName'));
    this.localSvc.deleteUserInfo();
  }

  async VerifyPassword() {
    const form = getEditUserForm(this.currentUser, 'Edit user details', 'user');
    const { value: formValues } = await Swal.fire(form);
    return formValues && formValues![1] == this.currentUser.password
      ? formValues
      : false;
  }

  UpdateUserPassword(currentUser: user, form: any) {
    currentUser.password = form[2];
    const index: any = this.localSvc.getLocalProperty('index');
    this.booksSvc.usersData[index] = currentUser;
    this.localSvc.setLocalProperty('usersData', this.booksSvc.usersData);
  }

  async VerifyAndUpdatePasswordHandler() {
    const form: any = await this.VerifyPassword();

    if (form) this.UpdateUserPassword(this.currentUser, form);

    Swal.fire(messages[form ? 'changeSuccessfully' : 'passwordIncorrect']);
  }
}
