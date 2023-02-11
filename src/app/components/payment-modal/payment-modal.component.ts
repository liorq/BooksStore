import { Component } from '@angular/core';
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
  cardNumber:string="";
  expireDate:string="";
  cvv:string="";
  isValidCard:boolean=false;

  constructor(private userInfoService:UserInfoService,private booksService:BooksService){}

   isValidCreditCard() {
    this.isValidCard=this.userInfoService.isValidCreditCard(this.isValidCard,this.cvv,this.expireDate,this.cardNumber)
    return this.isValidCard
  }

  processPaymentHandler(){
    if(this.isValidPayment()){
      this.userInfoService.updateIsPurchaseValid(true)
      this.booksService.updateCurrentBooks([])
      this.toggleModalPayment(true);
    }
  }

  toggleModalPayment(status:boolean){
    this.userInfoService.toggleModalPayment(status)
  }

  isValidPayment(){
    Swal.fire(messages[this.isValidCard?'purchasedSuccessfully':'invalidCreditCardDetails'])
     return this.isValidCard;
}

}
