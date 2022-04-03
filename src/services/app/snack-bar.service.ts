import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private matSnackBar: MatSnackBar) { }

  open(message: string): void {
    this.matSnackBar.open(message, null, {
      duration: 3500
    });
  }

  alert(message: string, acknowledgeButtonTitle: string = 'OK'): void {
    this.matSnackBar.open(message, acknowledgeButtonTitle);
  }
}
