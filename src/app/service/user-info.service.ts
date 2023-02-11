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
allBooks=new BehaviorSubject <book[]|null>(null);
isPurchaseValid=new BehaviorSubject <boolean>(false);
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
   deleteUserInfo(){
    this.isPaymentModalClose.next(true)
    this.isUserLogged.next(null)
    this.isGuestUser.next(null)
    this.currentUser.next(null)
   }
   updateUserSubjects(newUser:user){
    this.isUserLogged.next(true)
    this.isGuestUser.next(newUser.typeOfUser=='guest')
    this.currentUser.next(newUser)
   }

   updateIsGuestUser(status:boolean){
    this.isGuestUser.next(status)
  }
  toggleModalPayment(status:boolean){
    this.isPaymentModalClose.next(status)

  }
 updateIsPurchaseValid(status:boolean){
  this.isPurchaseValid.next(status)
 }
}
