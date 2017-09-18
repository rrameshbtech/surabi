import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class UsersModule { }
