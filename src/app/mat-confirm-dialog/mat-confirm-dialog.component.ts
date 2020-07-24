import {Component, Inject, OnInit} from '@angular/core';
//To received data here we need to import MAT_DIALOG_DATA.
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  //need to inject MAT_DIALOG_DATA here too.
  constructor(@Inject (MAT_DIALOG_DATA) public data) { }
  //need to give reference to the dialogComponent.
  public dialogRef:MatDialogRef<MatConfirmDialogComponent>
  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
