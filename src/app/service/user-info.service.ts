import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { book, user } from '../app.interfaces';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
isPaymentModalClose=new BehaviorSubject<boolean>(true)
isUserLogged=new BehaviorSubject<boolean|null>(null)
isGuestUser=new BehaviorSubject<boolean|null>(null);
currentUser=new BehaviorSubject <user|null>(null);

//use this
  updateCurrentUser(user:user){
   this.currentUser.next(user)
   this.isUserLogged.next(true);
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




}
