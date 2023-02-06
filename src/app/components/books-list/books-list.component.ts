import { Component, Input } from '@angular/core';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { book } from '../../app.interfaces';
import { BooksService } from '../../service/books.service';
import { getEditBookForm } from 'src/app/app.forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {

@Input()booksToDisplay?:book[]=[];
@Input()clickHandler?:any;
@Input()secondClickHandler?:any;
@Input()btnTitle?:string="";
@Input()allBooks?:book[] =[];
@Input()secondBtnTitle?:string="";
@Input()componentName="";
constructor(public booksSvc:BooksService,public localSvc :LocalService,public userInfoSvc:UserInfoService){}
}
