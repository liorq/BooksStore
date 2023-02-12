import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { book, user } from '../app.interfaces';

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


  updateCurrentUser(user:user|undefined){
  if(user)
  this.updateSubject(this.currentUser,user)
  this.updateSubject(this.isUserLogged,true)
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
    this.updateSubject(this.isPaymentModalClose,true)
    this.updateSubject(this.isUserLogged,null)
    this.updateSubject(this.isGuestUser,null)
    this.updateSubject(this.currentUser,null)
   }
   updateUserSubjects(newUser:user){
    this.updateSubject(this.isUserLogged,true)
    this.updateSubject(this.isGuestUser,(newUser.typeOfUser=='guest'))
    this.updateSubject(this.currentUser,newUser)
   }

 updateSubject(Subject:BehaviorSubject <any>,value:any){
  Subject.next(value)
 }

 isValidCreditCard(isValidCard:boolean,cvv:string,expireDate:string,cardNumber:string) {
  const cardNumberRegex = new RegExp("^\\d{16}$");
  const cvvRegex = /^[0-9]{3,4}$/;
  const today = new Date();
  const expiry = new Date(expireDate);
  isValidCard=cvvRegex.test(cvv)&&expiry < today&& cardNumberRegex.test(cardNumber)
  return  isValidCard

}

}
