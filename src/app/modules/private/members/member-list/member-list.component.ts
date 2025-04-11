import { trigger, transition, style, animate } from '@angular/animations';
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
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
    trigger('fadeBg', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ])
  ]
})
export class MemberListComponent implements OnInit {
  columns = {
    avatar:'',
    numeroInscricao: 'Número de Inscrição',
    cracha: 'Crachá',
    equipe: 'Equipe',
    stt: 'Status',
    actions:'actions',
  };

  dataSource: any = {
    items: [],
  };

  userSelected: any = <any>{};

  constructor(private _registrationService: RegistrationService) {}

  modalAberto = false;

  setModal(user:any) {
    console.log(user);

    this.userSelected = user;
    console.log(this.userSelected);

    this.abrirModal();
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  ngOnInit() {
    this._registrationService.read().subscribe((res: any) => {
      console.log(res);
      this.dataSource.items = res.map((item: any) => {
        return {
          numeroInscricao:String(item.numeroInscricao).padStart(4, '0') ,
          avatar: {
            nome: item.nome,
            cel: `(${item.cel.replace(/[^0-9]/g, '').slice(0, 2)}) ${item.cel.replace(/[^0-9]/g, '').slice(2, 6)}-${item.cel.replace(/[^0-9]/g, '').slice(6)}`,
          },
          cracha: item.cracha,
          equipe: item.equipe,
          stt: item.stt,
          id: item.id,
        };
      });
      // this.dataSource.items = res;
      console.log( this.dataSource.items);

    });
  }
}
