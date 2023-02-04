import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { messages } from '../app.messages';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
isPaymentModalClose=new Subject<boolean>()
isUserLogged=new Subject<boolean>()

  isValidUserInfo(userName: string, password: string, usersData: any[]) {
    return usersData.find((user: any) => userName == user.email && password == user.password)
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
    return (usersData.find((user: any) => user.email === newUser.email))==undefined;
  }

}
