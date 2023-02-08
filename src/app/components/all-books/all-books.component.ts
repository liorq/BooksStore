import { Component } from '@angular/core';
import { messages } from 'src/app/app.messages';
import { LocalService } from 'src/app/service/local.service';
import Swal from 'sweetalert2';
import { book } from '../../app.interfaces';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent {
  constructor(private localSvc: LocalService) {}
  //get from bookService
  allBooks: book[] = this.localSvc.getLocalProperty('allBooks');

  // this.bookService.allBooks.subscribe((allBooks)=>{
  //   if(allBooks==undefined)

  // })

  // this.bookService.AddBook(book)
  // this.LocalService.addBook(book)


  searchValue: string = '';
  booksToDisplay: book[] = [...this.allBooks];

  showMatchingBooks() {
    const capitalizedString = this.PrepareTheSearchValueForUse();
    const bookToDisplay = this.allBooks.filter((book) => {
      return book.name.toLowerCase().includes(capitalizedString);
    });
    this.booksToDisplay = [...bookToDisplay];
  }


  PrepareTheSearchValueForUse() {
    return this.searchValue.trim().toLowerCase().replaceAll(' ', '_');
  }


  addBooksToCart(book: book) {
    const currentCart = this.localSvc.getBooksInCarts();
    const Index = currentCart.findIndex((b: book) => b.name == book.name);
    if (Index != -1) currentCart[Index].amount++;
    else {
      book.amount = 1;
      currentCart.push({ ...book });
    }
    this.localSvc.UpdateBooksCartInUsersData([...currentCart]);
    Swal.fire(messages.BookAdded);
  }

}
