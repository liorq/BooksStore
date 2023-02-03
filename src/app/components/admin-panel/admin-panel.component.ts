import { Component, OnInit } from '@angular/core';
import { editBookForm } from 'src/app/app.forms';
import { book } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { LocalService } from 'src/app/service/local.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css','../books-list/books-list.component.css']
})
export class AdminPanelComponent implements OnInit{
  BookName: string="";
  price: string="";
  authorName: string="";
  BookId: string="";
  isAddBookModalOpen=false;
  isBooksPanelOpen=false;
  booksToDisplay:book[]=[];
  ngOnInit(){
    const allBooks=JSON.parse(this.localService.getLocalProperty('allBooks')||"[]")
    this.booksToDisplay=allBooks;
  }

   constructor(private localService:LocalService){}
   addBook(){
   const newBook:any= this.createNewBook()
  //  this.localService.setLocalProperty('allBooks',JSON.stringify(getAllBooks()))
   const allBooks=JSON.parse(this.localService.getLocalProperty('allBooks')||"[]")
   allBooks.push(newBook)
   this.booksToDisplay=allBooks;
   this.localService.setLocalProperty('allBooks',JSON.stringify(allBooks))
   Swal.fire(messages.BookAddedToLocalStorage)
  }
  createNewBook(){

  return{
    id:this.BookId,
   name:this.BookName,
   price:this.price,
  author: this.authorName,
  }
  }
  deleteBook(book:book){
    this.booksToDisplay = this.booksToDisplay.filter(b => b !== book);
    this.localService.setLocalProperty('allBooks',JSON.stringify(this.booksToDisplay))
  }

   async editBook(book:book){
    const form=editBookForm(book)
    const { value: formValues } = await Swal.fire(form);
    if (formValues){
      book.name=formValues[0];
      book.price=formValues[1];
      book.author=formValues[2];
      Swal.fire(messages.changeSuccessfully)
      this.localService.setLocalProperty('allBooks',JSON.stringify(this.booksToDisplay))
    }
  }


}
