import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/modules/public/registration/registration.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
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

  constructor(private _registrationService: RegistrationService, private _snackService:SnackbarService) {}

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
      this.dataSource.items = res.map((item: any) => {
        return {
          ...item,
          numeroInscricao:String(item.numeroInscricao).padStart(4, '0') ,
          avatar: {
            nome: item.nome,
            cel: `(${item.cel.replace(/[^0-9]/g, '').slice(0, 2)}) ${item.cel.replace(/[^0-9]/g, '').slice(2, 6)}-${item.cel.replace(/[^0-9]/g, '').slice(6)}`,
          },
          cpf: item.cpf.replace(/[^0-9]/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
        };
      }).sort((a: any, b: any) => a.numeroInscricao.localeCompare(b.numeroInscricao));;

    });
  }

  changeStt(id: string, stt: number) {
    this._registrationService.update(id, { stt: stt }).then((res: any) => {
      this._snackService.openSnackBar('Status atualizado com sucesso!', 'success');
      this.fecharModal();
    });
  }

  printRecibo() {
    const printContents = document.getElementById('recibo')?.innerHTML;
    const printWindow = window.open('', '', '');

    if (printWindow && printContents) {
      // Espera o documento estar pronto
      printWindow.document.head.innerHTML = `
        <style>
          body {
            font-family: monospace;
            font-size: 12px;
            padding: 10px;
            margin: 0;
          }
          .text-8xl {
            font-size: 6rem /* 96px */;
            line-height: 1;
          }
            .text-xs {
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
}
    .text-base {
    font-size: 1rem /* 16px */;
    line-height: 1.5rem /* 24px */;
}
    .justify-center {
    justify-content: center;
}
    .flex {
    display: flex;
}

button { display: none; }

 img {
          max-width: 25%;
        }

        </style>
      `;

      const body = printWindow.document.body;
      const contentDiv = printWindow.document.createElement('div');
      contentDiv.innerHTML = printContents;
      body.appendChild(contentDiv);

      // Aguarda o conteúdo ser renderizado antes de imprimir
      printWindow.document.close();
      printWindow.focus();

      // Pequeno delay para garantir renderização antes da impressão
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  }
}
