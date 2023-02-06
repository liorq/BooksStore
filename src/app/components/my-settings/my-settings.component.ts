import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteUserForm, getEditUserForm } from 'src/app/app.forms';
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
export class MySettingsComponent {
  constructor(
    private router: Router,
    public localService: LocalService,
    private userInfoService: UserInfoService,
    private booksService: BooksService
  ) {}

  async deleteUser() {

    ////////isValid
    ///////קודם כל בדיקה ואז שאלה או handleDeleteUser
    ///לא עושים ישר את הדליט
    
    const currentUser = this.localService.getUserObj();
    // handleDeleteUser()
    const isUserConfirmedDelete: any = await DeleteUserForm(currentUser.password);
    if (isUserConfirmedDelete) {
      this.localService.deleteUser(
        this.localService.getLocalProperty('currentUserName')
      );
      this.localService.deleteUserInfo();
      this.userInfoService.isUserLogged.next(false);
      this.router.navigate(['/SignIn']);
    }
  }

  async changePropertyOfUser() {
    const currentUser = this.localService.getUserObj();
    const form = getEditUserForm(currentUser, 'Edit user details', 'user');

    const { value: formValues } = await Swal.fire(form);
    const isValidateForm = formValues![1] == currentUser.password && formValues;

    if (isValidateForm) {
      currentUser.email = formValues[0];
      currentUser.password = formValues[2];
      const index: any = this.localService.getLocalProperty('index');
      this.booksService.usersData[index] = currentUser;
      this.localService.setLocalProperty(
        'usersData',
        JSON.stringify(this.booksService.usersData)
      );
    }

    Swal.fire(
      messages[isValidateForm ? 'changeSuccessfully' : 'passwordIncorrect']
    );
  }
}
