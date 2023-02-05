import { Component } from '@angular/core';
import { messages } from 'src/app/app.messages';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import Swal from 'sweetalert2';
import { getAllBooks } from '../../app.books';
import { book } from '../../app.interfaces';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent  {
  constructor(private localService:LocalService,private userInfoService:UserInfoService){}
// allBooks:book[]=JSON.parse(this.localService.getLocalProperty('allBooks')||"[]")

allBooks:book[]=getAllBooks()

searchValue:string="";
booksToDisplay:book[]=[...this.allBooks];


showMatchingBooks(){
  const capitalizedString=this.PrepareTheSearchValueForUse();
  const bookToDisplay= this.allBooks.filter((book)=>{
    return  book.name.toLowerCase().includes(capitalizedString)
  })
  this.booksToDisplay=[...bookToDisplay]
}

PrepareTheSearchValueForUse(){
 return this.searchValue.trim().toLowerCase().replaceAll(' ','_');

}

addBooksToCart(book:book){
   const currentCart=this.localService.getBooksInCarts();
   const Index=currentCart.findIndex((b:book)=>b.name==book.name);
    if(Index!=-1){
    currentCart[Index].amount++;
    this.localService.UpdateBooksCartInUsersData([...currentCart]);
   }
   else{
   book.amount=1;
   this.localService.UpdateBooksCartInUsersData([...currentCart,{...book}]);
   }

  Swal.fire(messages.BookAdded)
  }
}
