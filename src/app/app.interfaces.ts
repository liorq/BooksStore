export interface book{
  name:string,
  author:string,
  id:string
  price:any,
}

export interface user{
email:string,
typeOfUser:string,
booksInCart:book[],
password:string
}






