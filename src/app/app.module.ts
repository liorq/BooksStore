import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { MySettingsComponent } from './components/my-settings/my-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [

  { path: 'signUp', component:SignUpComponent  },
  { path: 'pay', component:PaymentModalComponent  },
  { path: 'allBooks', component:AllBooksComponent  },
  { path: 'signIn', component:SignInComponent  },
  { path: '', component:SignInComponent , pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BooksListComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    AllBooksComponent,
    MyCartComponent,
    MySettingsComponent,
    PaymentModalComponent,
    AdminPanelComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
