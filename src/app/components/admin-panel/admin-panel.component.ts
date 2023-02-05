import { Component, OnInit } from '@angular/core';
import { getAllBooks } from 'src/app/app.books';
import {  genericForm } from 'src/app/app.forms';
import { book } from 'src/app/app.interfaces';
import { messages } from 'src/app/app.messages';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['../books-list/books-list.component.css','./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit{

  isAddBookModalOpen=false;
  isBooksPanelOpen=false;
  booksToDisplay:book[]=[];
  book:any={
    Book_Name:"",
    price:"",
    author_Name:"",
  }
  ngOnInit(){

    this.booksToDisplay=JSON.parse(this.localService.getLocalProperty('allBooks')||"[]")
    //  this.localService.setLocalProperty('allBooks',JSON.stringify(getAllBooks()))
  }

   constructor(private localService:LocalService,private userInfoService:UserInfoService){}

   addBook(){
   const newBook:any= this.createNewBook();
   this.booksToDisplay.push(newBook);
   this.localService.setLocalProperty('allBooks',JSON.stringify([...this.booksToDisplay]))
   Swal.fire(messages.BookAddedToLocalStorage)
   this.resetBookFields()
  }

  resetBookFields(){
    this.book={  Book_Name:"",price:"",author_Name:"",Book_Id:"",}
  }


  createNewBook(){
  return{
   name:this.book.Book_Name,
   price:parseInt(this.book.price)||80,
   author: this.book.author_Name,
  }
  }


  deleteBook(book:book){
    this.booksToDisplay = this.booksToDisplay.filter(b => b.name !== book.name);
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
