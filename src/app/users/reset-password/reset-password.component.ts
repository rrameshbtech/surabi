import { Component, OnInit } from '@angular/core';

import { EqualValidator } from './equal-validator.directive';
import { UserService } from '../services/user.service';
import { ToastService } from '../../shared/toast.service';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'srb-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordSubscription: any;

  constructor(private userService: UserService
  , private toaster: ToastService
  , private auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword(resetPasswordForm) {
    this.resetPasswordSubscription = this.userService.resetPassword(this.auth.session.userId, this.existingPassword, this.newPassword)
      .subscribe(() => {
        this.toaster.show('Password has been changed successfully.');
        if (resetPasswordForm) {
          resetPasswordForm.resetForm();
        }
      });

      
  }

}
