import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/modules/public/registration/registration.service';
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
    avatar:'',
    numeroInscricao: 'Número de Inscrição',
    cracha: 'Crachá',
    equipe: 'Equipe',
    stt: 'Status',
  };

  dataSource: any = {
    items: [
      {
        avatar: {
          nome: 'Nome',
          cel: '8888888888',

        },
        cracha: 'Crachá',
        stt: 'Status',
        equipe: 'Equipe',
      },
      {
        avatar: {
          nome: 'Nome',
          cel: '8888888888',

        },
        cracha: 'Crachá',
        stt: 'Status',
        equipe: 'Equipe',
      },
    ],
  };

  constructor(private _registrationService: RegistrationService) {}

  ngOnInit() {
    this._registrationService.read().subscribe((res: any) => {
      console.log(res);
      this.dataSource.items = res.map((item: any) => {
        return {
          numeroInscricao: item.numeroInscricao,
          avatar: {
            nome: item.nome,
            cel: item.contato,
          },
          cracha: item.cracha,
          equipe: item.equipe,
          stt: item.stt,
        };
      });
      // this.dataSource.items = res;
      console.log( this.dataSource.items);

    });
  }
}
