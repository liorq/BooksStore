import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { getEditBookForm } from '../app.forms';
import { book, user } from '../app.interfaces';
import { DisplayBookInfoMessage } from '../app.messages';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  usersData:user[]=[];
  currentBooks=new Subject<book[]>();

  getBookPicture(book:book){
   return {'defaultPic':true,[book.name]:true }
   }

   DisplayBookInfo(book:book){
   Swal.fire(DisplayBookInfoMessage(book))
   }
   async isValidEditBookForm(book:book){
    return await Swal.fire(getEditBookForm(book,'Edit book','book'));
 }

 editBook(book:book,validForm:any){

  book.name=validForm[0]==undefined?book.name:validForm[0];
  book.price=validForm[1]==undefined?book.price:parseInt(validForm[1]);
  book.author=validForm[2]==undefined?book.author:validForm[2];

  // book.name=validForm[0]||book.name;
  // book.price = validForm[1] ? parseInt(validForm[1]) : book.price;
  // book.author=validForm[2]||book.author;
}

}
