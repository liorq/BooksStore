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
    const obj:any={}
     obj['defaultPic']=true;
     obj[book.name]=true;
     return obj
   }

   DisplayBookInfo(book:book){
   const message= DisplayBookInfoMessage(book)
   Swal.fire(message)

   }

}
