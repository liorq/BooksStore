import Swal from "sweetalert2"

export function editBookForm(book:any){

  return genericForm(book,'Edit book','book')

return{
title: 'Edit book',
    html:
      `<div>Please enter the name of the new book.</div>  <input id="swal-input1" class="swal2-input" value=${book.name}>` +
      `<div>Please enter the new price of the book.</div> <input id="swal-input2" class="swal2-input" value=${book.price}>` +
      `<div>Please enter the new author name for the book.</div> <input id="swal-input3" class="swal2-input" value=${book.author}>`,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (document.getElementById('swal-input1') as HTMLInputElement)?.value,
        (document.getElementById('swal-input2') as HTMLInputElement)?.value,
        (document.getElementById('swal-input3') as HTMLInputElement)?.value,

      ]
    }
}



}


export function editUserForm(user:any){

  return genericForm(user,'Edit user details','user')

  return{
  title: 'Edit user details',
      html:
        `<div>Please enter your new userName</div><input id="swal-input1" class="swal2-input" value=${user.email}>` +
        `<div>Please enter your old password</div><input id="swal-input2" class="swal2-input">`+
        `<div>Please enter your new password</div><input id="swal-input3" class="swal2-input">` ,

      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement)?.value,
          (document.getElementById('swal-input2') as HTMLInputElement)?.value,
          (document.getElementById('swal-input3') as HTMLInputElement)?.value,
        ]
      }
      }

  }





  export function genericForm(user:any,title:string,property:string){
    return{
      title: `${title}`,
          html:
            `<div>Please enter  ${property=='user'?'your new userName':'the name of the new book.'}.</div>  <input id="swal-input1" class="swal2-input" value=${property=='user'?user.email:user.name}>` +
            `<div>Please enter  ${property=='user'?'your old password':'the new price of the book.'}.</div> <input id="swal-input2" class="swal2-input" value=${property=='user'?'':user.price}>` +
            `<div>Please enter  ${property=='user'?'your new password':'the new author name for the book.'}.</div>   <input id="swal-input3" class="swal2-input"  value=${property=='user'?'':user.author}>` ,
          focusConfirm: false,
          preConfirm: () => {
            return [
              (document.getElementById('swal-input1') as HTMLInputElement)?.value,
              (document.getElementById('swal-input2') as HTMLInputElement)?.value,
              (document.getElementById('swal-input3') as HTMLInputElement)?.value,
            ]
          }
      }



    }




  export async function DeleteUserForm(){
    const swalWithBootstrapButtons =await Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton:'btn btn-success'
      },
      buttonsStyling: false
    })

   const result:any=await swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
         swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your user has been deleted.',
          'success'
        )

          } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
     return result
    })

    return !result.dismiss

  }

