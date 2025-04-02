import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'eels-input',
  templateUrl: './eels-input.component.html',
  styleUrls: ['./eels-input.component.scss'],
})
export class EelsInputComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() typeInput = '';
  @Input() maxL = '';
  @Input() minL = '';
  @Input() mask = '';
  @Input() type = '';
  @Input() password = false;
  @Input() controlForm!: FormControl;

  hide = true;

  changeType(){
    this.typeInput = this.hide ? 'password' : 'text'
  }


}
