import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'eels-select',
  templateUrl: './eels-select.component.html',
  styleUrls: ['./eels-select.component.scss'],
})
export class EelsSelectComponent {
  @Input() label = '';
  @Input() options: any[] = [];
  @Input() controlForm!: FormControl;

  @Output() changeEvent = new EventEmitter<number>();

  onChange(element: any) {
    this.changeEvent.emit(element);
  }
}
