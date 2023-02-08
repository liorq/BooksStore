import { Component, OnInit } from '@angular/core';
import { book } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: [
    '../books-list/books-list.component.css',
    './my-cart.component.css',
  ],
})
export class MyCartComponent implements OnInit {
  constructor(
    private localSvc: LocalService,
    private booksSvc: BooksService,
    public userInfoSvc: UserInfoService
  ) {}


  booksToDisplay: book[] = [];
  isPaymentModalClose: boolean = true;
  ngOnInit() {
    this.userInfoSvc.isPaymentModalClose.subscribe((newStatus) => {
      this.isPaymentModalClose = newStatus;
    });

    this.booksSvc.currentBooks.subscribe((updateBooks) => {
      this.localSvc.UpdateBooksCartInUsersData([...updateBooks]);
      this.booksToDisplay = [...updateBooks];
      this.totalCharge(this.booksToDisplay);
    });


    if (this.localSvc.isUserLogged())
    this.UpdateCartFromLocalStorage();
  }




  removeBookFromCart(book: book) {
    const index = this.booksToDisplay.findIndex((b) => b == book);
    if( this.booksToDisplay[index].amount == 1)
    this.booksToDisplay.splice(index, 1)
    else
     this.booksToDisplay[index].amount--;
     
    Swal.fire(messages.BookRemoved);
    this.booksSvc.updateCurrentBooks([...this.booksToDisplay])

  }



  AddBookQuantity(book: book) {
    book.amount++;
    this.booksSvc.updateCurrentBooks([...this.booksToDisplay]);
  }

  UpdateCartFromLocalStorage() {
    ///getCart
    const data = this.localSvc.getBooksInCarts();
    this.booksSvc.updateCurrentBooks([...data])
  }


  totalCharge(currentCart: book[]) {
    return currentCart.reduce((sum, book) => sum + book.price * book.amount, 0);
  }
}
