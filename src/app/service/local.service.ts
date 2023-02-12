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

  deleteUser(){
    const usersData=this.getLocalProperty('usersData')
   const  userName:any= this.getLocalProperty('currentUserName')
   const filteredData = usersData.filter((user: any) => user?.email !== userName);
   this.setLocalProperty('usersData',filteredData)
   this.deleteUserInfo();
  }

  getBooksInCarts(){
   const usersData=this.getLocalProperty('usersData')
    const currentUserName:any= this.getLocalProperty('currentUserName')
    return usersData.find((user: any) => user.email === currentUserName)?.booksInCart
  }

   UpdateBooksCartInUsersData(books:book[]){
    ////put the cart between the userName and password
    const usersData=this.getLocalProperty('usersData')
    const index:string= this.getLocalProperty('index')
    usersData[index].booksInCart=[...books]
    this.setLocalProperty('usersData',[...usersData])
  }

  getUserObj(){
    const usersData=this.getLocalProperty('usersData')
    const currentUserName:string= this.getLocalProperty('currentUserName')
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



  UpdateUserPassword(currentUser: user,form:any) {

    currentUser.password = form[2];
    const index=this.getLocalProperty('index')
    const usersData=this.getLocalProperty('usersData')
    usersData[index]=currentUser;
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
    const usersData=this.getLocalProperty('usersData')

    usersData.forEach((u:user) => {
       return (u.booksInCart = u.booksInCart.filter(
         (b:book) => b.name !== book.name));
     });
     this.setLocalProperty('usersData', usersData);
   }

 isValidUserInfo(userName: string, password: string) {
  const usersData=this.getLocalProperty('usersData')

    return usersData.find((user: any) => userName == user.email && password == user.password)
  }

  isPasswordCurrent(formValues:any){
    const currentUser=this.getUserObj()
    return formValues![1] == currentUser?.password;
   }

  isUserNameAvailable(newUser:any){
    const usersData=this.getLocalProperty('usersData');
    return (usersData.find((user: any) => user.email === newUser.email))==undefined;
  }
  addNewUser(newUser:user){
    const usersData=this.getLocalProperty('usersData')
    const newUserAdded:user={
      email: newUser.email,
      password: newUser.password,
      booksInCart: this.getBooksInCarts()||[],
      typeOfUser:newUser.typeOfUser,
    }

    this.setLocalProperty("currentUserName",newUser.email)
    this.setLocalProperty('usersData',[...usersData,newUserAdded]);
    this.updateIndex(newUserAdded.email)
    // return newUserAdded
  }



}
