import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '@app/models/user.model';

@Component({
  selector: 'srb-user-view-dialog',
  templateUrl: './user-view-dialog.component.html',
  styles: []
})
export class UserViewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user:User) { }

  ngOnInit() {
  }

}
