import Swal from "sweetalert2"

  export function genericForm(parameter:any,title:string,property:string){

    return{
      title: `${title}`,
          html:
            `<div> ${property=='user'?'':'Please enter the name of the new book.'}.</div>  <input ${property=='user'?'disabled':''} id="swal-input1" class="swal2-input" value=${property=='user'?parameter.email:parameter.name}>` +
            `<div>Please enter  ${property=='user'?'your old password':'the new price of the book.'}.</div> <input   id="swal-input2" type=${property=='user'?'password':'text'} class="swal2-input" value=${property=='user'?'':parameter.price}>` +
            `<div>Please enter  ${property=='user'?'your new password':'the new author name for the book.'}.</div>   <input id="swal-input3" type=${property=='user'?'password':'text'} class="swal2-input"  value=${property=='user'?'':parameter.author}>` ,
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



  export async function DeleteUserForm(userPassword:string){

    const { value: password } = await Swal.fire({
      title: 'Please verify your password',
      input: 'password',
      inputLabel: 'password',
      inputPlaceholder: 'Enter your password'
    })

    if (password!=userPassword) {
      Swal.fire(`Incurrent password: try again`)
      return
    }





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

