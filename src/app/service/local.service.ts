import { Injectable } from '@angular/core';
import { book, user } from '../app.interfaces';
@Injectable({
  providedIn: 'root'
})
export class LocalService {


  getLocalProperty(property:string){

    if(property=='index'||property=='currentUserName')
     return localStorage.getItem(`${property}`);

    return JSON.parse(localStorage.getItem(`${property}`)||"[]");
  }

  setLocalProperty(property:string,value:any){
    if(property=='index'||property=='currentUserName')
      return localStorage.setItem(`${property}`,value);

      return localStorage.setItem(`${property}`,JSON.stringify(value));
  }



  deleteUserInfo() {
    this.setLocalProperty('currentUserName','');
    this.setLocalProperty('index','');
  }

  deleteUser(userName:any){
   const usersData:any= this.getLocalProperty('usersData')
   const filteredData = usersData.filter((user: any) => user?.email !== userName);
   this.setLocalProperty('usersData',filteredData)
  }

  getBooksInCarts(){

    if(!this.isUserLogged())
     return

    const currentUserName:any= this.getLocalProperty('currentUserName')
    const usersData:any= this.getLocalProperty('usersData')
    return usersData.find((user: any) => user.email === currentUserName)?.booksInCart
  }

   UpdateBooksCartInUsersData(books:book[]){
    ////put the cart between the userName and password
    const usersData:any= this.getLocalProperty('usersData')
    const index:any= this.getLocalProperty('index')
    usersData[index].booksInCart=[...books]
    this.setLocalProperty('usersData',[...usersData])
  }

  getUserObj(){
    const currentUserName:string= this.getLocalProperty('currentUserName')
    const usersData:user[]= this.getLocalProperty('usersData')
    return usersData.find((user: any) => user?.email === currentUserName)
  }

  initialLocalProperty(Property:string,value:any){
    if(this.getLocalProperty(Property)===undefined)
    this.setLocalProperty(Property,value)
  }

  initialLocalStorageToDefault(){
      this.initialLocalProperty('usersData',"[]")
      this.initialLocalProperty('allBooks',"[]")
      this.initialLocalProperty('index',"")
      this.initialLocalProperty('currentUserName',"")
  }

  isUserLogged(){
    return this.getLocalProperty('currentUserName')!="";
  }

  addNewUser(newUser:user){
    const usersData=this.getLocalProperty('usersData')
    this.setLocalProperty('index',usersData.length-1)
    this.setLocalProperty("currentUserName",newUser.email)
    this.setLocalProperty('usersData',[...usersData,newUser]);
  }
  UpdateUserPassword(currentUser: user,index:string) {

    const usersData= this.getLocalProperty('usersData');
    usersData[index]=currentUser
    this.setLocalProperty('usersData', usersData);
  }
  signIn(userName:string){
    this.setLocalProperty("currentUserName",userName)
    this.updateIndex(userName)
  }
  updateIndex(userName:any){
    const usersData=this.getLocalProperty('usersData')
    const index = usersData.findIndex((user:user) => user.email == userName);
    this.setLocalProperty("index",index)
  }


  deleteBooksFromCarts(book:book){
    
    const usersData=this.getLocalProperty('usersData');
    usersData.forEach((u:user) => {
       return (u.booksInCart = u.booksInCart.filter(
         (b:book) => b.name !== book.name));
     });
     this.setLocalProperty('usersData', usersData);
   }

}
