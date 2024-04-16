import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NotificationService } from './notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;
  let dialog: MatDialog;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of({}),
      close: null,
    });

    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success message', () => {
    service.showSuccess('Success!');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Success!', 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  });

  it('should show error message', () => {
    service.showError('Error!');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Error!', 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  });

  it('should show confirmation dialog and return true if confirmed', (done) => {
    dialogRefSpyObj.afterClosed.and.returnValue(of(true));

    service.showConfirmation('Confirm?').subscribe((result) => {
      expect(result).toBe(true);
      expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
        data: { message: 'Confirm?' },
      });
      done();
    });
  });

  it('should show confirmation dialog and return false if not confirmed', (done) => {
    dialogRefSpyObj.afterClosed.and.returnValue(of(false));

    service.showConfirmation('Confirm?').subscribe((result) => {
      expect(result).toBe(false);
      expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
        data: { message: 'Confirm?' },
      });
      done();
    });
  });
});
