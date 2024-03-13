import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  showConfirmation(message: string, confirmCallback: () => void) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        confirmCallback();
      }
    });
  }
}
