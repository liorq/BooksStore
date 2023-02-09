import { Component } from '@angular/core';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';
import { book } from '../../app.interfaces';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent {
  constructor(private localSvc: LocalService,private userInfoSvc:UserInfoService,private booksSvc:BooksService) {}


  allBooks: book[] =this.userInfoSvc.allBooks.getValue()||this.localSvc.getLocalProperty('allBooks');
  searchValue: string = '';
  booksToDisplay: book[] = [...this.allBooks];

  currentCart:book[]=this.booksSvc.currentBooks.getValue();


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
/////////לנסות לשפר
    const currentCart:any = this.localSvc.getBooksInCarts();
    const Index = currentCart.findIndex((b: book) => b.name == book.name);
    if (Index != -1) currentCart[Index].amount++;
    else {
      book.amount = 1;
      currentCart.push({ ...book });
    }

    this.localSvc.UpdateBooksCartInUsersData([...currentCart]);
    this.booksSvc.updateCurrentBooks(currentCart)
    Swal.fire(messages.BookAdded);
  }

}
