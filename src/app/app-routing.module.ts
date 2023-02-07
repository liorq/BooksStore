import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MySettingsComponent } from './components/my-settings/my-settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'SignUp', component: SignUpComponent },
  {path: 'users/:user/Setting', component: MySettingsComponent} ,
  { path: 'users/:user/allBooks', component: AllBooksComponent },
  { path: 'users/:user/my-Cart', component: MyCartComponent },
  { path: 'SignIn', component: SignInComponent },
  {path: 'users/:user/admin', component: AdminPanelComponent},
  { path: '', component: SignInComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
