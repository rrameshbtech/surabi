import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { ToastService } from '@app/shared/toast.service';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'srb-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordSubscription: any;
  existingPassword: string;
  newPassword: string;
  confirmPassword: string;

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
