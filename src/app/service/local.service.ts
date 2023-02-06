import { Injectable } from '@angular/core';
import { book } from '../app.interfaces';
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  //  getLocalProperty(property:string){

  //   return localStorage.getItem(`${property}`);
  // }
  // setLocalProperty(property:string,value:any){
  //    localStorage.setItem(`${property}`,value);
  // }

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
    const currentUserName:any= this.getLocalProperty('currentUserName')
    const usersData:any= this.getLocalProperty('usersData')
    return usersData.find((user: any) => user?.email === currentUserName)
  }

  initialLocalProperty(Property:string,value:any){
    if(this.getLocalProperty(Property)===undefined)
    this.setLocalProperty(Property,value)
  }

  initialLocalStorageToDefault(){
      this.initialLocalProperty('usersData',"[]")
      this.initialLocalProperty('currentUserName',"")
  }

  isUserLogged(){
    return this.getLocalProperty('currentUserName')!="";
  }


}
