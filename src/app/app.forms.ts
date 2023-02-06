import Swal, { SweetAlertResult } from 'sweetalert2';
import { swalObj } from './app.swalObj';

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







 async function openModalAndGetInput(value: any) {

    return await Swal.fire(value);
  }
  async function verifyPassword(userPassword:string){
    const password: any =await openModalAndGetInput(swalObj.verifyPassword);

  if (password?.value != userPassword) {
    Swal.fire(`Incurrent password: try again`);
    return;
  }
  return password;
  }



 async function verifyDelete(){

  const swalWithBootstrapButtons = Swal.mixin(swalObj.btnsDangerAndSuccess);
  const result: any = await swalWithBootstrapButtons.fire(swalObj.wariningOfDelete);

  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire(
      'Deleted!',
      'Your user has been deleted.',
      'success'
    );

  } else if (result.dismiss === Swal.DismissReason.cancel)
    swalWithBootstrapButtons.fire('Cancelled', '', 'error');



  return !result.dismiss;

}



export async function DeleteUserForm(userPassword: string) {

  const isValid= verifyDelete();
 const isPassword= verifyPassword(userPassword)


}
