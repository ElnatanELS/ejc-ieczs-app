import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
})
export class TableHeaderComponent implements OnInit {
  @Output() onCheck = new EventEmitter<boolean>();

  @Input() columns: any ;
  @Input() keys: any ;

  ngOnInit(): void {
   this.keys = Object.keys(this.columns);

  }
  public toggle(event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.onCheck.emit(value);
  }
}
