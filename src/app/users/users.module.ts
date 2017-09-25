import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BusyModule } from 'angular2-busy';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BusyModule,

    UsersRoutingModule
  ],
  declarations: [LoginComponent, HomeComponent],
  providers: [
    UserService
  ]
})
export class UsersModule { }
