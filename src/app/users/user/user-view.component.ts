import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { User } from '../../models/user.model';

@Component({
  selector: 'srb-user-view',
  templateUrl: './user-view.component.html',
  styles: []
})
export class UserViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserViewComponent>,
    @Inject(MAT_DIALOG_DATA) public user:User) { }

  ngOnInit() {
  }

}
