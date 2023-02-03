import { Component, OnInit } from '@angular/core';
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
export class AllBooksComponent implements OnInit {
  constructor(private localService:LocalService,private userInfoService:UserInfoService){}
allBooks:book[]=getAllBooks();
searchValue:string="";
booksToDisplay:book[]=[...this.allBooks];


ngOnInit(){
if(this.localService.isUserLogged()){
  this.userInfoService.isUserLogged.next(true)
}
}


showMatchingBooks(){
  let capitalizedString=this.PrepareTheSearchValueForUse()
  const bookToDisplay= this.allBooks.filter
  ((book)=>{return  book.name.includes(capitalizedString)})
  this.booksToDisplay=[...bookToDisplay]
}

PrepareTheSearchValueForUse(){
  let capitalizedString = this.searchValue.trim().toLowerCase().replaceAll(' ','_')
  capitalizedString = capitalizedString.charAt(0).toUpperCase() +capitalizedString.slice(1);
  return capitalizedString;
}

addBooksToCart(book:book){
  const currentCart=this.localService.getBooksInCarts();
  currentCart.push({...book})
  this.localService.UpdateBooksCartInUsersData([...currentCart]);
  Swal.fire(messages.BookAdded)
  }
}
