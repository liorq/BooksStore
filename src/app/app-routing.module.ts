import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MySettingsComponent } from './components/my-settings/my-settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'SignUp', component: SignUpComponent },
  {path: 'pay', component: PaymentModalComponent},
  {path: 'Setting', component: MySettingsComponent},
  {path: 'admin', component: AdminPanelComponent},
  { path: 'allBooks', component: AllBooksComponent },
  { path: 'myCart', component: MyCartComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: '', component: SignInComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
