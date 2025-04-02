import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eels-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class EelsButtonComponent {
  @Input() text = '';
  @Input() typeButton = '';
  @Input() icon = '';
  @Input() isDisabled!: boolean;

  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }
}
