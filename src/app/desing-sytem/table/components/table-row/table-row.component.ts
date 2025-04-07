import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
})
export class TableRowComponent implements OnInit {
  @Input() user: any = <any>{};
  campos:any;

  constructor() {


  }
  ngOnInit(): void {
    this.campos = Object.keys(this.user);
    this.campos = this.campos.filter((campo: any) => campo !== 'avatar');
    this.campos = this.campos.filter((campo: any) => campo !== 'stt');
    console.log(this.campos);


  }

}
