import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { messages } from '../app.messages';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
isPaymentModalClose=new Subject<boolean>()
isUserLogged=new Subject<boolean>()

  constructor() { }

  isValidUserInfo(userName: string, password: string, usersData: any[]) {
    for (let user of usersData) {
      if (userName == user.email && password == user.password)
        return  true
    }
    return false;
  }
  getInvalidMessage(errors:any,property:string,error:keyof typeof errors,errorMessage:string){
    if (errors?.required) {
      return `You must enter your ${property}`;
    }
    if (errors?.[error]) {
      return errorMessage;
    }
    return
  }
  isUserAvailable(newUser:any,usersData:any){
    if (usersData.find((user: any) => user.email === newUser.email)) {
      Swal.fire(messages.usernameIsntAvailable)
      return false;
    }
    return true;
  }

}
