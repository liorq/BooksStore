import Swal, { SweetAlertResult } from 'sweetalert2';

export function getEditBookForm(parameter: any, title: string, property: string) {
  return {
    title: `${title}`,
    html:
      `<div> Please enter the name of the new book.</div>
        <input id="swal-input1" class="swal2-input"
        value=${parameter.name}>`+
        `<div>Please enter the new price of the book.</div>
       <input   id="swal-input2" type=text class="swal2-input" value=${ parameter.price}>` +
      `<div>Please enter  the new author name for the book.</div>
        <input id="swal-input3" type=text class="swal2-input"  value=${parameter.author}>`,
     focusConfirm: false,
    preConfirm: () => {
      return [
        (document.getElementById('swal-input1') as HTMLInputElement)?.value,
        (document.getElementById('swal-input2') as HTMLInputElement)?.value,
        (document.getElementById('swal-input3') as HTMLInputElement)?.value,
      ];
    },
  };
}

export function getEditUserForm(parameter: any, title: string, property: string) {
  return {
    title: `${title}`,
    html:
      `  <input disabled  id="swal-input1" class="swal2-input" value=${parameter.email} >` +
      `<div>Please enter your old password.</div>
       <input id="swal-input2" type='password' class="swal2-input" >` +
      `<div>Please enter your new password.</div>
      <input id="swal-input3" type=password class="swal2-input" >`,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (document.getElementById('swal-input1') as HTMLInputElement)?.value,
        (document.getElementById('swal-input2') as HTMLInputElement)?.value,
        (document.getElementById('swal-input3') as HTMLInputElement)?.value,
      ];
    },
  };
}









export async function DeleteUserForm(userPassword: string) {
  async function openModalAndGetInput(this: any, value: any) {
    return await this.fire(value);
  }

  const password: SweetAlertResult<string> = await Swal.fire({
    title: 'Please verify your password',
    input: 'password',
    inputLabel: 'password',
    inputPlaceholder: 'Enter your password',
  });

  if (password?.value != userPassword) {
    Swal.fire(`Incurrent password: try again`);
    return;
  }

  //varfifyPassword

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-success',
    },
    buttonsStyling: false,
  });

  const result: any = await swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Deleted!',
      'Your user has been deleted.',
      'success'
    );
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
  }

  // varfifyDelete

  return !result.dismiss;
}
