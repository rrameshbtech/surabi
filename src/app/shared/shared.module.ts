import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MaterialModule } from '../material.module';
import { ExceptionService } from './exception.service';
import { ToastService } from './toast.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommonDialogService } from './common-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
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
    CommonDialogService
  ],
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
