import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MessageBoardComponent} from './message-board/message-board.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AccountComponent} from './account/account.component';
import {NotFoundComponent} from './not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/message-board', pathMatch: 'full'},
  {path: 'message-board', component: MessageBoardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'my-account', component: AccountComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
