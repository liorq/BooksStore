import { Component, OnInit } from '@angular/core';
import { getAllBooks } from 'src/app/app.books';
import { getEditBookForm } from 'src/app/app.forms';
import { book, user } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { BooksService } from 'src/app/service/books.service';
import { LocalService } from 'src/app/service/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: [
    '../books-list/books-list.component.css',
    './admin-panel.component.css',
  ],
})
export class AdminPanelComponent implements OnInit {
  isAddBookModalOpen = false;
  isBooksPanelOpen = false;
  booksToDisplay: book[] = [];
  book: any = {
    Book_Name: '',
    price: '',
    author_Name: '',
  };
  ngOnInit() {
    // this.localService.setLocalProperty('allBooks',JSON.stringify(getAllBooks()))
    // this.booksSvc.usersData = this.localSvc.getLocalProperty('usersData');

    this.booksToDisplay = this.localSvc.getLocalProperty('allBooks');

  }

  constructor(private localSvc: LocalService,public booksSvc: BooksService
  ) {}

  addBookProcess() {
    const newBook: any = this.createNewBook();
    this.booksToDisplay.push(newBook);
    this.localSvc.setLocalProperty('allBooks', [...this.booksToDisplay]);
    Swal.fire(messages.BookAddedToLocalStorage);
    this.resetBookFields();
  }



  resetBookFields() {
    this.book = { Book_Name: '', price: '', author_Name: '', Book_Id: '' };
  }



  createNewBook() {
    return {
      name: this.book.Book_Name,
      price: parseInt(this.book.price) || 80,
      author: this.book.author_Name,
    };
  }



  deleteBook(book: book) {
    this.booksToDisplay=this.booksToDisplay.filter((b) => b.name !== book.name);
    this.localSvc.deleteBooksFromCarts(book)
    this.localSvc.setLocalProperty('allBooks', this.booksToDisplay);
  }




  async editBookHandler(book: book) {
    const { value: validForm }: any = await Swal.fire(
      getEditBookForm(book, 'Edit book', 'book'));

    if (validForm) {
      Swal.fire(messages.changeSuccessfully);
      this.booksSvc.editBook(book, validForm);
      this.localSvc.setLocalProperty('allBooks',this.booksToDisplay);
    }
  }
}
