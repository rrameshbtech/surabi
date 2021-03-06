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

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserFilterComponent } from './user/user-filter.component';
import { UserViewDialogComponent } from './user/user-view-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EqualValiadtorDirective } from './reset-password/equal-validator.directive';

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
    SharedModule,
    CoreModule
  ],
  declarations: [
    LoginComponent,
    UserComponent,
    UsersComponent,
    UserFilterComponent,
    UserViewDialogComponent,
    ResetPasswordComponent,
    EqualValiadtorDirective
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    UserViewDialogComponent
  ]
})
export class UsersModule { }
