import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finder-press',
  templateUrl: './finder-press.component.html',
  styleUrls: ['./finder-press.component.css']
})
export class FinderPressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() user: any = <any>{};

}
