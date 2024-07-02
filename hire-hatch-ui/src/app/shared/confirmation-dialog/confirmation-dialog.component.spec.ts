import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true when confirmed', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when cancelled', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});
