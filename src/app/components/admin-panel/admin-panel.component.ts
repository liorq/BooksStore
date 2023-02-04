import { Component, OnInit } from '@angular/core';
import {  genericForm } from 'src/app/app.forms';
import { book } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css','../books-list/books-list.component.css']
})
export class AdminPanelComponent implements OnInit{

  isAddBookModalOpen=false;
  isBooksPanelOpen=false;
  booksToDisplay:book[]=[];
  book:any={
    BookName:"",
    price:"",
    authorName:"",
    BookId:"",
  }
  ngOnInit(){

    const allBooks=JSON.parse(this.localService.getLocalProperty('allBooks')||"[]")
    this.booksToDisplay=allBooks;
  }

   constructor(private localService:LocalService,private userInfoService:UserInfoService){}

   addBook(){
   const newBook:any= this.createNewBook()
   this.booksToDisplay.push(newBook)
   this.localService.setLocalProperty('allBooks',JSON.stringify([...this.booksToDisplay]))
   Swal.fire(messages.BookAddedToLocalStorage)
  }

  createNewBook(){
  return{
    id:this.book.BookId,
   name:this.book.BookName,
   price:parseInt(this.book.price)||80,
  author: this.book.authorName,
  }
  }

  deleteBook(book:book){
    this.booksToDisplay = this.booksToDisplay.filter(b => b !== book);
    this.localService.setLocalProperty('allBooks',JSON.stringify(this.booksToDisplay))
  }

   async editBook(book:book){
    const form=genericForm(book,'Edit book','book')

    const { value: formValues } = await Swal.fire(form);
    if (formValues){
      book.name=formValues[0];
      book.price=parseInt(formValues[1])||80;
      book.author=formValues[2];
      Swal.fire(messages.changeSuccessfully)
      this.localService.setLocalProperty('allBooks',JSON.stringify(this.booksToDisplay))
    }
  }

}
