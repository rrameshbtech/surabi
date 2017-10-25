import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MaterialModule } from '../material.module';
import { ExceptionService } from './exception.service';
import { ToastService } from './toast.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommonDialogService } from './common-dialog.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HttpResponseInterceptor } from './auth/http-response-interceptor.service';
import { AuthTokenInterceptor } from './auth/auth-token-interceptor.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ConfirmDialogComponent
  ],
  providers: [
    ExceptionService,
    ToastService,
    CommonDialogService,
    AuthGuardService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
