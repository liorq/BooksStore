
import { book } from "./app.interfaces"

export const messages:any={
  errorMessages :{
    password:'password needs to contain at least 8 characters.',
    email: 'Invalid email address. Please enter a valid email address.',
    name: ' name must be at least 4 characters.',
    typeOfUser:'Please choose a user type'
  },

  BookAdded: {
    title: 'Book added to cart.',
    icon: 'question',
    iconHtml: '=)',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  BookAddedToLocalStorage: {
    title: 'Book added.',
    icon: 'question',
    iconHtml: '=)',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  BookRemoved: {
    title: 'Book removed.',
    icon: 'question',
    iconHtml: '=(',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  usernameIncorrect: {
    title: 'Username or password incorrect',
    icon: 'question',
    iconHtml: '=(',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  passwordIncorrect: {
    title: 'Incorrect old password. Please try again.',
    icon: 'question',
    iconHtml: '=(',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  changeSuccessfully: {
    title: 'Details successfully updated.',
    icon: 'question',
    iconHtml: '=)',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  usernameIsntAvailable: {
    title: 'The username is not available.Please try again',
    icon: 'question',
    iconHtml: '=(',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  usernameAdded: {
    title: 'User added successfully',
    icon: 'question',
    iconHtml: '=)',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  userDelete: {
    title:
      'User deleted successfully',
    icon: 'question',
    iconHtml: '=(',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  purchasedSuccessfully: {
    title:
      'The purchase was successfully made. Thank you very much.',
    showClass: {popup: 'animate__animated animate__fadeInDown'},
    hideClass: {popup: 'animate__animated animate__fadeOutUp'},
    confirmButtonText: 'ok',
    showCloseButton: true,
    imageUrl:`../../assets/images/delivery.png`,
    imageWidth:'250px',imageHeight:'250px',

  },
  invalidCreditCardDetails: {
    title:
      'Invalid credit card details. Please check and try again.',
    icon: 'question',
    iconHtml: '=(',
    confirmButtonText: 'ok',
    showCloseButton: true,
  },
  warningDeleteUse:{
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  },
  swalWithBootstrapButtons:{
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
  }
}

export function DisplayBookInfoMessage(book:book)
{
  const image={}
  return {
    customClass: {
      textColor: '.text-white',
      title:'.text-white'
    },
    title: `Name: ${book.name}\n Price: ${book.price + " $"}\n Author: ${book.author}\n`,
    background: 'url(../../assets/images/background.png)',
    showClass: { popup: 'animate__animated animate__fadeInDown' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp' },

    imageUrl: `../../../assets/images/${book.author=='Rick'?`${book.name}`:'defualtPic'}.png`,
    imageWidth: '250px',
    imageHeight: '250px',

  };
}





// export function getAllBooks(){
//   return [{
//     name:'Five_easy_steps_to_become_amazing',
//    price:89,
//    author:'lior daniel',
//    id:'1'
// },
// {
//   name:'Greek_gods',
//  price:96,
//  author:'Rick Riordan',
//  id:"2"
// },
// {
//   name:'The_sea_of_monsters',
//  price:85,
//  author:'Rick Riordan',
//  id:"3"
// },
// {
//   name:'The_lightning_thief',
//  price:93,
//  author:'Rick Riordan',
//  id:'4'
// },
// {
//   name:'The_titans_curse',
//  price:78,
//  author:'Rick Riordan',
//  id:'5'
// },
// {
//   name:'The_last_olympian',
//  price:99,
//  author:'Rick Riordan',
//  id:'6'
// },
// {
//   name:'The_singer_of_apollo',
//  price:75,
//  author:'Rick Riordan',
//  id:'7'
// },
// {
//   name:'The_lost_hero',
//  price:89,
//  author:'Rick Riordan',
//  id:'8'
// },

// ]

// }
