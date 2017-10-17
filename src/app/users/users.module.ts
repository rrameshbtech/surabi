import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusyModule } from 'angular2-busy';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';

import { SharedModule } from '../shared/shared.module';
import { HttpResponseInterceptor } from '../shared/http-response-interceptor.service';
import { UserFilterComponent } from './user/user-filter.component';
import { UserViewComponent } from './user/user-view.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BusyModule,
    FlexLayoutModule,

    MaterialModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    UserComponent,
    UsersComponent,
    UserFilterComponent,
    UserViewComponent
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true }
  ],
  entryComponents: [
    UserViewComponent
  ]
})
export class UsersModule { }
