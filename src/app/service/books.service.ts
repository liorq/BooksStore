import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
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



}
