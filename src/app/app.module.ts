import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoutingModule} from './routing.module';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MessageBoardComponent} from './message-board/message-board.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginComponent} from './login/login.component';
import {PasswordConfirmValidationService} from './services/passwordconfirm-validation.service';
import {EmailConfirmValidationService} from './services/emailconfirm-validation.service';
import {UserService} from './services/user.service';
import {AccountComponent} from './account/account.component';
import {PasswordComponent} from './account/password/password.component';
import {PostService} from './services/post.service';
import {DeleteAccountComponent} from './account/delete-account/delete-account.component';
import {EmailComponent} from './account/email/email.component';
import {UsernameComponent} from './account/username/username.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MessageBoardComponent,
    SignUpComponent,
    LoginComponent,
    AccountComponent,
    PasswordComponent,
    DeleteAccountComponent,
    EmailComponent,
    UsernameComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RoutingModule
  ],
  providers: [UserService,
    PostService,
    PasswordConfirmValidationService,
    EmailConfirmValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
