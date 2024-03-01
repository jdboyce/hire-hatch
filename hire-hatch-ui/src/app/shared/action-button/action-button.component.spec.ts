import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonComponent } from './action-button.component';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionButtonComponent],
      imports: [MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent).toContain('Test Label');
  });

  it('should call the action when clicked', () => {
    let actionCalled = false;
    component.action = () => (actionCalled = true);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    expect(actionCalled).toBe(true);
  });
});
