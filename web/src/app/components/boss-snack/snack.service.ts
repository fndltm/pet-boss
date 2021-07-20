import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from './boss-snack.component';

@Injectable()
export class SnackService {
  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, snackType: string, duration?: number) {
    const _snackType: string = snackType !== undefined ? snackType : 'success';
    const _className = snackType;
    const _duration = duration !== undefined ? duration : 3000;

    this.snackBar.openFromComponent(SnackComponent, {
      duration: _duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [_className],
      data: { message: message, snackType: _snackType, duration: _duration }
    });
  }
}
