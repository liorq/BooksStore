import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})

export class PaymentModalComponent {
  cardNumber:any;
  expireDate:any;
  cvv:any;
  isValidCard:boolean=false;
  
  constructor(private userInfoService:UserInfoService,private booksService:BooksService){}
  closeModal(){
    this.userInfoService.isPaymentModalClose.next(true)
  }

   isValidCreditCard(): any {
    const cardNumberRegex = new RegExp("^\\d{16}$");
    const cvvRegex = /^[0-9]{3,4}$/;
    const today = new Date();
    const expiry = new Date(this.expireDate);
    this.isValidCard=cvvRegex.test(this.cvv)&&expiry < today&& cardNumberRegex.test(this.cardNumber)
    return  this.isValidCard
  }

  processThePayment(){
    if(this.isValidPayment()){
       this.closeModal()
       this.booksService.currentBooks.next([])
    }
  }

  isValidPayment(){
    Swal.fire(messages[this.isValidCard?'purchasedSuccessfully':'invalidCreditCardDetails'])
     return this.isValidCard;
}
}
