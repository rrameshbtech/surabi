import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthGuardService } from '../shared/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },{
        path: 'resetpassword',
        component: ResetPasswordComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        component: UserComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
