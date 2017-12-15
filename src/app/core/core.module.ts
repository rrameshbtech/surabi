import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ExceptionService } from './exception.service';
import { AuthGuard } from './auth/auth.guard';
import { HttpResponseInterceptor } from './auth/http-response-interceptor.service';
import { AuthTokenInterceptor } from './auth/auth-token-interceptor.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    ExceptionService,
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ]
})
export class CoreModule { }
