import { Injectable } from '@angular/core';
import {MatConfirmDialogComponent} from "../mat-confirm-dialog/mat-confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private _dialog: MatDialog) { }

  openConfirmDialog(msg){
    this._dialog.open(MatConfirmDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
}
