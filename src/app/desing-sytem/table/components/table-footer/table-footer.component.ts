import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
})
export class TableFooterComponent {
  @Input() page:any;
  @Input() itens:any;
}
