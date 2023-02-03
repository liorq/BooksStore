import { Component, OnInit } from '@angular/core';
import { DeleteUserForm, genericForm } from 'src/app/app.forms';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-settings',
  templateUrl: './my-settings.component.html',
  styleUrls: ['./my-settings.component.css']
})
export class MySettingsComponent implements OnInit{
constructor(public localService:LocalService,private userInfoService:UserInfoService,private booksService:BooksService){}
ngOnInit(): void {
  if(this.localService.isUserLogged()){
    this.userInfoService.isUserLogged.next(true)
  }
}
 async deleteUser(){
  
   const isUserConfirmDelete:any=await DeleteUserForm()
    if(isUserConfirmDelete)
   this.localService.deleteUser(this.localService.getLocalProperty('currentUserName'))
  }

  async changePropertyOfUser(){
   const currentUser= this.localService.getUserObj();
   const form=genericForm(currentUser,'Edit user details','user')

   const {value:formValues}=await Swal.fire(form)
   const isValidateForm=formValues![1]==currentUser.password&&formValues;

   if(isValidateForm){
    currentUser.email=formValues[0];
    currentUser.password=formValues[2];
    const index:any=this.localService.getLocalProperty('index')
    this.booksService.usersData[index]=currentUser;

    this.localService.setLocalProperty('usersData',JSON.stringify([...this.booksService.usersData]))
  }

   Swal.fire(isValidateForm?messages.changeSuccessfully:messages.passwordIncorrect)
  }

}
