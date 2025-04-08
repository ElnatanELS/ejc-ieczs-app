import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() isOpen = false;
  @Input() title = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

}
