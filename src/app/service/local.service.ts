import { Injectable } from '@angular/core';
import { book } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  getLocalProperty(property:string){
    return localStorage.getItem(`${property}`);
  }
  setLocalProperty(property:string,value:any){
     localStorage.setItem(`${property}`,value);
  }

  deleteUserInfo() {
    this.setLocalProperty('isUserLogged',false);
    this.setLocalProperty('currentUserName','');
    this.setLocalProperty('index','');
  }

  deleteUser(userName:any){
   const usersData:any= JSON.parse(this.getLocalProperty('usersData')||"[]")
   const filteredData = usersData.filter((user: any) => user.email !== userName);
   this.setLocalProperty('usersData',JSON.stringify(filteredData))

  }

  getBooksInCarts(){
    const currentUserName:any= this.getLocalProperty('currentUserName')
    const usersData:any= JSON.parse(this.getLocalProperty('usersData')||"[]")
    return usersData.find((user: any) => user.email === currentUserName).booksInCart
  }

   UpdateBooksCartInUsersData(books:book[]){
    ////put the cart between the userName and password
    const usersData:any= JSON.parse(this.getLocalProperty('usersData')||"[]")
    const index:any= this.getLocalProperty('index')
    usersData[index].booksInCart=[...books]
    this.setLocalProperty('usersData',JSON.stringify([...usersData]))
  }

  getUserObj(){
    const currentUserName:any= this.getLocalProperty('currentUserName')||""
    const usersData:any= JSON.parse(this.getLocalProperty('usersData')||"[]")
    return usersData.find((user: any) => user.email === currentUserName)
  }

  initialLocalProperty(Property:string,value:any){
    if(this.getLocalProperty(Property)===undefined)
    this.setLocalProperty(Property,value)
  }

  initialLocalStorageToDefault(){
      this.initialLocalProperty('usersData',"[]")
      this.initialLocalProperty('isUserLogged',true)
      this.initialLocalProperty('currentUserName',"")
  }

  isUserLogged(){
    return this.getLocalProperty('currentUserName')!="";
  }


}
