import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../model/user.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  animations: [
      trigger('openClose', [
        state(
          'open',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            visibility: 'visible',
          }),
        ),
        state(
          'closed',
          style({
            opacity: 0,
            transform: 'translateY(-20px)',
            visibility: 'hidden',
          }),
        ),
        transition('open => closed', [animate('0.2s')]),
        transition('closed => open', [animate('0.2s')]),
      ]),
    ],
})
export class TableRowComponent implements OnInit {
  @Input() user: any = <any>{};
  @Input() columns: any ;
  @Output() userSelected: any = new EventEmitter();
  campos:any;
  public isOpen = false;

  constructor() {


  }
  ngOnInit(): void {
    this.campos = Object.keys(this.user);
    this.columns = Object.keys(this.columns);
    console.log('campos',this.campos);
    console.log('columns',this.columns);
    console.log('user',this.user);




  }

  public toggleMenu(): void {
    this.userSelected.emit(this.user);
  }

}
