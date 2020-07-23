import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public _snackBar: MatSnackBar) { }
  config:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:'right',
    verticalPosition: 'top'
  }

  success(msg){
    this.config['panelClass'] = ['notification', 'success'];
    this._snackBar.open(msg, '', this.config);
  }
}
