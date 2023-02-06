export const swalObj:any={

  wariningOfDelete:
    {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    },

btnsDangerAndSuccess:{
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-success',
    },
    buttonsStyling: false,
  }
,verifyPassword:{
  title: 'Please verify your password',
  input: 'password',
  inputLabel: 'password',
  inputPlaceholder: 'Enter your password',
}


}
