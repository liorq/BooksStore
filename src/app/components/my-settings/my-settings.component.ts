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




  constructor(
    public router: Router,
    public localSvc: LocalService,
    private userInfoSvc: UserInfoService,
  ) {}

  ngOnInit(): void {
    this.userInfoSvc.currentUser.subscribe((currentUser)=>{
      this.currentUser=currentUser;
    })
  }

  async isUserConfirmedDelete(userPassword: string) {
    return (await verifyPassword(userPassword)) && (await verifyDelete());
  }

  async deleteUserHandler() {
    const isUserConfirmedDelete: any = await this.isUserConfirmedDelete(
      this.currentUser.password
    );

    if (isUserConfirmedDelete) {
      this.localSvc.deleteUser();
      this.localSvc.deleteUserInfo();
      this.userInfoSvc.isUserLogged.next(false);
      this.router.navigate(['/SignUp']);
    }
  }


  async VerifyPassword() {
    const form = getEditUserForm(this.currentUser, 'Edit user details', 'user');
    const { value: formValues } = await Swal.fire(form);

    return formValues &&this.localSvc.isPasswordCurrent(formValues)? formValues: false;

  }

  UpdateUserPassword(currentUser: user, form: any) {
    currentUser.password = form[2];
    const index=this.localSvc.getLocalProperty('index')
    this.localSvc.UpdateUserPassword(currentUser,index)
  }



  async VerifyAndUpdatePasswordHandler() {
    const form: any = await this.VerifyPassword();

    if (form)
     this.UpdateUserPassword(this.currentUser, form);

    Swal.fire(messages[form ? 'changeSuccessfully' : 'passwordIncorrect']);
  }
}
