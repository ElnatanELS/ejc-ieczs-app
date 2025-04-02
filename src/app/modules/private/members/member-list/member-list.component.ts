import { Component, OnInit } from '@angular/core';
export interface MemberModel {
  id: string;
  nome: string;
  contato: string;
  dataBatismo: string;
  complet: string;
  actions: string;
}

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  columns = {
    avatar: '',
    nome: 'Nome',
    contato: 'Contato',
    dataBatismo: 'Data de Batismo',
    stt: 'Status',
    actions: '',
  };

  dataSource: any = {
    items: [
      {
        avatar: '1',
        nome: 'Pedro',
        contato: '(83)99145-4545',
        dataBatismo: '03/03/2003',
        stt: '2',
        actions: '',
      },
      {
        avatar: '1',
        nome: 'Pedro',
        contato: '(83)99145-4545',
        dataBatismo: '03/03/2003',
        stt: '1',
        actions: '',
      },
    ],
  };




  constructor() {}

  ngOnInit() {}
}
