import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { book, user } from '../app.interfaces';
import { DisplayBookInfoMessage } from '../app.messages';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  currentBooks= new BehaviorSubject<book[]>([]);

  updateCurrentBooks(data:book[]){
    if(data)
    this.currentBooks.next([...data]);
  }

  getBookPicture(book:book){
   return {'defaultPic':true,[book.name]:true }
   }

   DisplayBookInfo(book:book){
   Swal.fire(DisplayBookInfoMessage(book))
   }


 editBook(book:book,validForm:string[]){
  book.name=validForm[0]||book.name;
  book.price=validForm[1]?parseInt(validForm[1]):book.price;
  book.author=validForm[2]||book.author;
}
createNewBook(Name:string,Price:string,Author:string) {
  return {
    name: Name,
    price: parseInt(Price) || 80,
    author:Author,
    amount:0,
  };
}
}
