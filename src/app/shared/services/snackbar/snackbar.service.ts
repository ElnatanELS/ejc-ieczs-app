import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar,) { }

  openSnackBar(msg:string, type:string) {
    this._snackBar.open(msg, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration:50000,
       panelClass: [`snackbar-type-soft-${type}`]

    });
  }
}
