import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,

    UsersRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    UserService
  ]
})
export class UsersModule { }
