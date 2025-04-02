import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'eels-radio',
  templateUrl: './eels-radio.component.html',
  styleUrls: ['./eels-radio.component.css'],
})
export class EelsRadioComponent {
  @Input() options: any[] = [];
  @Input() controlForm!: FormControl;
}
