import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BusyModule } from 'angular2-busy';

import { MaterialModule } from '../material.module';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule,
    BusyModule,

    MaterialModule,
    UsersRoutingModule
  ],
  declarations: [
    LoginComponent, 
    HomeComponent, 
    UsersComponent
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
