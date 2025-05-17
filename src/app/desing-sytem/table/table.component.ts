import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { User } from './model/user.model';
import { TableFilterService } from './services/table-filter.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnChanges {
  users = signal<any[]>([]);
  page: any = 1
  itens: any = 10

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1
};



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

  filtrados: any[] = [];

  originalItens: any[] = [];

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



    this.filtrados = this.dataSource.items.map((item: any) => {
      const novoItem: any = {};
      if (item.avatar) {
        novoItem.avatar = item.avatar;
      }
      Object.keys(this.columns).forEach((campo) => {
        if (campo in item) {
          novoItem[campo] = item[campo];
        }
      });
      return novoItem;
    });
  }

  constructor(
    private http: HttpClient,
    private filterService: TableFilterService,
    private _formBuilder: FormBuilder,
  ) {
    effect(() => {
      const search = this.filterService.searchField().toLowerCase();
      if (!search) {
        this.dataSource.items = [...this.dataSource.originalItems]; // Assuming originalItems holds all the original data
      } else {
        this.dataSource.items = this.dataSource?.originalItems?.filter((item: any) => {
          return (
        item?.avatar?.nome?.toLowerCase().includes(search) ||
        item?.numeroInscricao?.toString().toLowerCase().includes(search) ||
        item?.cracha?.toLowerCase().includes(search) ||
        item?.nome?.toLowerCase().includes(search)
          );
        });
      }
       console.log('tes =>', this.filterService.searchField().toLowerCase());
    });
  }

  public toggleUsers(checked: boolean) {
    this.users.update((users) => {
      return users.map((user) => {
        return { ...user, selected: checked };
      });
    });
  }

  private handleRequestError(error: any) {
    const msg =
      'An error occurred while fetching users. Loading dummy data as fallback.';
    // toast.error(msg, {
    //   position: 'bottom-right',
    //   description: error.message,
    //   action: {
    //     label: 'Undo',
    //   },
    //   actionButtonStyle: 'background-color:#DC2626; color:white;',
    // });
  }

  filteredUsers = computed(() => {
    const search = this.filterService.searchField().toLowerCase();
    const status = this.filterService.statusField();
    const order = this.filterService.orderField();

    console.log('search', search);


    // return this.users().filter(
    //   (user) =>
    //     user?.nome?.toLowerCase().includes(search) ||
    //     user?.cracha?.toLowerCase().includes(search)
    // );
    // .filter((user) => {
    //   if (!status) return true;
    //   switch (status) {
    //     case '1':
    //       return user.status === 1;
    //     case '2':
    //       return user.status === 2;
    //     case '3':
    //       return user.status === 3;
    //     default:
    //       return true;
    //   }
    // })
    // .sort((a, b) => {
    //   const defaultNewest = !order || order === '1';
    //   if (defaultNewest) {
    //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    //   } else if (order === '2') {
    //     return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    //   }
    //   return 0;
    // });
  });

  filtrado(row: any) {
    const novoItem: any = {};
    if (row.avatar) {
      novoItem.avatar = row.avatar;
    }
    Object.keys(this.columns).forEach((campo) => {
      if (campo in row) {
        novoItem[campo] = row[campo];
      }
    });

    return novoItem;
  }

  ngOnInit() {
    this.displayToColumns = this.columns;
    this.originalItens = this.dataSource.items

    this.filterService.searchField.set('');
    this.filterService.statusField.set('');
    this.filterService.orderField.set('1');

  }
}
