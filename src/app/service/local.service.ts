import { Injectable } from '@angular/core';
import { book, user } from '../app.interfaces';
@Injectable({
  providedIn: 'root'
})
export class LocalService {

usersData:user[]=this.getLocalProperty('usersData');
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

  deleteUser(){
   const  userName:any= this.getLocalProperty('currentUserName')
   const filteredData = this.usersData.filter((user: any) => user?.email !== userName);
   this.setLocalProperty('usersData',filteredData)
  }

  getBooksInCarts(){

    if(!this.isUserLogged())
     return

    const currentUserName:any= this.getLocalProperty('currentUserName')
    return this.usersData.find((user: any) => user.email === currentUserName)?.booksInCart
  }

   UpdateBooksCartInUsersData(books:book[]){
    ////put the cart between the userName and password
    const index:any= this.getLocalProperty('index')
    this.usersData[index].booksInCart=[...books]
    this.setLocalProperty('usersData',[...this.usersData])
  }

  getUserObj(){
    const currentUserName:string= this.getLocalProperty('currentUserName')
    return this.usersData.find((user: any) => user?.email === currentUserName)
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
    const newUserAdded:user={
      email: newUser.email,
      password: newUser.password,
      booksInCart: this.getBooksInCarts()||[],
      typeOfUser:newUser.typeOfUser,
    }
    this.setLocalProperty('index',this.usersData.length-1)
    this.setLocalProperty("currentUserName",newUser.email)
    this.setLocalProperty('usersData',[...this.usersData,newUserAdded]);
  }

  UpdateUserPassword(currentUser: user,index:any) {
    this.usersData[index]=currentUser;
    this.setLocalProperty('usersData', this.usersData);
  }


  signIn(userName:string){
    this.setLocalProperty("currentUserName",userName)
    this.updateIndex(userName)
  }
  updateIndex(userName:any){
    const index = this.usersData.findIndex((user:user) => user.email == userName);
    this.setLocalProperty("index",index)
  }


  deleteBooksFromCarts(book:book){
    this.usersData.forEach((u:user) => {
       return (u.booksInCart = u.booksInCart.filter(
         (b:book) => b.name !== book.name));
     });
     this.setLocalProperty('usersData', this.usersData);
   }

 isValidUserInfo(userName: string, password: string) {
    return this.usersData.find((user: any) => userName == user.email && password == user.password)
  }

  isPasswordCurrent(formValues:any){
    const currentUser=this.getUserObj()
    return formValues![1] == currentUser?.password;
   }

  isUserNameAvailable(newUser:any){
    return (this.usersData.find((user: any) => user.email === newUser.email))==undefined;
  }

}
