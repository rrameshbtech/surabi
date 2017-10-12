import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'srb-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
    `.message-container {
      margin-bottom:10px;
    }
    .message-container > .mat-icon{
      margin-right:10px;
    }`
  ]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>
    , @Inject(MAT_DIALOG_DATA) public confirmDetails: any) 
    { }

  ngOnInit() {
  }

  public confirm(){
    this.dialogRef.close(true);
  }
}
