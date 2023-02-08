import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { user } from '../app.interfaces';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
isPaymentModalClose=new BehaviorSubject<boolean>(true)
isUserLogged=new BehaviorSubject<boolean|null>(null)
isGuestUser=new BehaviorSubject<boolean|null>(null);
currentUser=new BehaviorSubject <user|null>(null);
usersData=new BehaviorSubject <user[]>([]);

//use this
  updateCurrentUser(user:user){
   this.currentUser.next(user)
   this.isUserLogged.next(true);
  }
  

  isValidUserInfo(userName: string, password: string) {
    return this.usersData.getValue().find((user: any) => userName == user.email && password == user.password)
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
  isUserAvailable(newUser:any){
    return (this.usersData.getValue().find((user: any) => user.email === newUser.email))==undefined;
  }

  addNewUser(newUser:user){
    this.usersData.next([...this.usersData.getValue(),newUser])


  }
  UpdateUserPassword(currentUser: user,index:string) {
    const usersData:any= this.usersData.getValue();
    usersData[index]=currentUser;
    this.usersData.next([usersData])

  }



}
