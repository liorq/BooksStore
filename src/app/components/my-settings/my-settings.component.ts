import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getEditUserForm,
  verifyDelete,
  verifyPassword,
} from 'src/app/app.forms';
import { user } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
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
  currentUser?: user;
  isUserLogged?: boolean;

  constructor(
    private router: Router,
    private localSvc: LocalService,
    private userInfoSvc: UserInfoService
  ) {}

  ngOnInit(): void {
    this.userInfoSvc.currentUser.subscribe((currentUser) => {
      this.currentUser = currentUser || this.localSvc.getUserObj();
    });
  }

  async isUserConfirmedDelete(userPassword: string) {
    return (await verifyPassword(userPassword)) && (await verifyDelete());
  }

  async deleteUserHandler() {
    if (!this.currentUser)
     return;

    const isUserConfirmedDelete: any = await this.isUserConfirmedDelete(
      this.currentUser.password
    );

    if (isUserConfirmedDelete) {
      this.localSvc.deleteUser();
      this.userInfoSvc.updateSubject(this.userInfoSvc.isUserLogged,false)
      this.router.navigate(['/sign-Up']);
    }
  }

  async VerifyPasswordHandler() {
    const form = getEditUserForm(this.currentUser, 'Edit user details', 'user');
    const { value: formValues } = await Swal.fire(form);
    return formValues && this.localSvc.isPasswordCorrect(formValues)
      ? formValues
      : false;
  }

  async VerifyAndUpdatePasswordHandler() {
    const form: boolean | string[] = await this.VerifyPasswordHandler();
    if (form && this.currentUser)
      this.localSvc.UpdateUserPassword(this.currentUser, form);

    Swal.fire(messages[form ? 'changeSuccessfully' : 'passwordIncorrect']);
  }
}
