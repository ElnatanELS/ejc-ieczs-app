import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'eels-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() actions: any = {
    view: true,
    delete: true,
    edit: true,
  };
  @Input() columns: any = {};
  @Input() class: any = {};
  @Input() dataSource: any = {};
  @Input() paginator = false;
  @Input() sort = false;

  @Output() pageFired = new EventEmitter<PageEvent>();
  @Output() sortFired = new EventEmitter<Sort>();

  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  displayToColumns!: string[];

  handelPagination(e: PageEvent) {
    this.pageFired.emit(e);
  }
  handelSort(e: Sort) {
    this.sortFired.emit(e);
  }

  public deleteButton(element: any) {
    this.delete.emit(element);
  }

  public viewButton(element: any) {
    this.view.emit(element);
  }

  public editButton(element: any) {
    this.edit.emit(element);
  }

  ngOnChanges() {
    this.displayToColumns = Object.keys(this.columns);
  }
}
