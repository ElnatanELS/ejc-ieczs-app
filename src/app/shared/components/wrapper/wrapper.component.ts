import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  @Input() arrowLeft = false
  @Input() title:string = ''

  @Output() arrowEvent = new EventEmitter<void>()


  onClick(){
    this.arrowEvent.emit()
  }



  constructor() { }

  ngOnInit(): void {
  }

}
