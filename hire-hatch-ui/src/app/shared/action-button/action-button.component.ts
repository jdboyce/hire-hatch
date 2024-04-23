import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Input() label: string | undefined;
  @Input() action: (() => void) | undefined;
  @Input() disabled: boolean = false;
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() icon: string | undefined;

  onClick(event: Event) {
    event.preventDefault();
    if (this.action) {
      this.action();
    }
  }
}
