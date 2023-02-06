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
    public localService: LocalService,
    public booksService: BooksService,
    public userInfoService: UserInfoService
  ) {}
  booksToDisplay: book[] = [];
  isPaymentModalClose: boolean = true;
  ngOnInit() {
    this.userInfoService.isPaymentModalClose.subscribe((newStatus) => {
      this.isPaymentModalClose = newStatus;
    });

    this.booksService.currentBooks.subscribe((updateBooks) => {
      this.localService.UpdateBooksCartInUsersData([...updateBooks]);
      this.booksToDisplay = [...updateBooks];
      this.totalCharge(this.booksToDisplay);
    });

    if (this.localService.isUserLogged())
    this.UpdateCartFromLocalStorage();
  }

  removeBookFromCart(book: book) {
    const index = this.booksToDisplay.findIndex((b) => b == book);
    if( this.booksToDisplay[index].amount == 1)
    this.booksToDisplay.splice(index, 1)
    else
     this.booksToDisplay[index].amount--;

    Swal.fire(messages.BookRemoved);
    this.booksService.currentBooks.next([...this.booksToDisplay]);
  }

  AddBookQuantity(book: book) {
    book.amount++;
    this.booksService.currentBooks.next([...this.booksToDisplay]);
  }

  UpdateCartFromLocalStorage() {
    const data = this.localService.getBooksInCarts();
    this.booksService.currentBooks.next([...data]);
    this.userInfoService.isUserLogged.next(true);
  }


  totalCharge(currentCart: book[]) {
    return currentCart.reduce((sum, book) => sum + book.price * book.amount, 0);
  }
}
