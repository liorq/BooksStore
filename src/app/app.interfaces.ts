export interface book{
  name:string,
  author:string,
  price:any,
  amount:number,
}

export interface user{
email:string,
typeOfUser:string,
booksInCart:book[],
password:string
}






