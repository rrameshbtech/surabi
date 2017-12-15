import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthGuard } from '@app/core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'resetpassword',
        component: ResetPasswordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
