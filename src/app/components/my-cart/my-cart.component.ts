import { Component, OnInit } from '@angular/core';
import { book } from 'src/app/app.interfaces';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['../books-list/books-list.component.css','./my-cart.component.css']
})
export class MyCartComponent implements OnInit{
  constructor(private localService:LocalService,private booksService:BooksService,private userInfoService:UserInfoService){}
  booksToDisplay:book[]=[];
  isPaymentModalClose:boolean=true;
  filteredBooks:book[]=[];
  ngOnInit(){

  this.userInfoService.isPaymentModalClose.subscribe((newStatus)=>{
  this.isPaymentModalClose=newStatus;
  })

  this.booksService.currentBooks.subscribe((updateBooks)=>{
    this.localService.UpdateBooksCartInUsersData([...updateBooks])
    this.booksToDisplay=[...updateBooks];
    this.totalCharge(this.booksToDisplay)
  })

  if (this.localService.isUserLogged())
  this.UpdateCartFromLocalStorage();


  this.filteredDoubledBooks()
  }


  filteredDoubledBooks(){
    const AmountOfBooks:any=[];
    
    for(let book of this.booksToDisplay){

      if(AmountOfBooks[book.name]==undefined)
       AmountOfBooks[book.name]=1;
      else
       AmountOfBooks[book.name]++;
    }
    console.log(AmountOfBooks)

    this.filteredBooks=AmountOfBooks;

    }

  removeBookFromCart(book:book){
   const index= this.booksToDisplay.findIndex((b)=>b==book)
    this.booksToDisplay.splice(index,1)
    this.booksService.currentBooks.next([...this.booksToDisplay])
  }

  displayModalPayment(){
    this.userInfoService.isPaymentModalClose.next(false);
  }



  UpdateCartFromLocalStorage(){
    const data = this.localService.getBooksInCarts();
    this.booksService.currentBooks.next([...data]);
    this.userInfoService.isUserLogged.next(true);
}
  totalCharge(currentCart:book[]){
    return currentCart.reduce((sum,book) => sum + book.price, 0);
  }

}
