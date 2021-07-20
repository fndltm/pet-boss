import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'boss-snackbar',
  templateUrl: './boss-snack.component.html',
  styleUrls: ['./boss-snack.component.scss']
})
export class SnackComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<SnackComponent>
  ) { }

  ngOnInit(): void {
  }

  public dismiss(): void {
    this.snackBarRef.dismiss();
  }

  get getIcon(): string {
    const snackType = this.data.snackType.toLowerCase();
    switch (snackType) {
      case 'success':
        return 'done';
      case 'error':
        return 'not_interested';
      case 'warning':
        return 'report';
      case 'info':
        return 'priority_high';
      default:
        return 'done';
    }
  }
}
