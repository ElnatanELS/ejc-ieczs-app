import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FindersServiceService } from '../service/finders-service.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-finders-list',
  templateUrl: './finders-list.component.html',
  styleUrls: ['./finders-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
    trigger('fadeBg', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class FindersListComponent implements OnInit {
  columns = {
    numeroInscricao: 'Número de Inscrição',
    nome: 'Nome do Encontrista',
    stt: 'Status',
    rensposavel: 'Responsável',
    actions: 'actions',
  };

  dataSource: any = {
    items: [],
  };

  userSelected: any = <any>{};

  constructor(private _findersService: FindersServiceService, private _snackService:SnackbarService) {}

  modalAberto = false;

  setModal(user: any) {
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

    this._findersService.read().subscribe((res: any) => {
      this.dataSource.items = res
        .map((item: any) => {
          return {
        ...item,
        numeroInscricao: String(item.numeroInscricao).padStart(4, '0'),
          };
        })
        .sort((a: any, b: any) => a.numeroInscricao.localeCompare(b.numeroInscricao));
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



        body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
}
.logo {
  text-align: center;
  margin-bottom: 20px;
}
.logo img {
  height: 80px;
}
h1 {
  text-align: center;
}
label {
  font-weight: bold;
  display: block;
  margin-top: 15px;
  font-size: 14px;
}
input, textarea {
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
}
.section-title {
  margin-top: 15px;
  font-size: 1.0 em;
  text-decoration: underline;
}
.form-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.form-group {
  flex: 1;
  min-width: 120px;
}
.signature-section {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-end;
}
.signature-box {
  flex: 1;
  border-top: 1px solid #000;
  text-align: center;
  padding-top: 5px;
}
.date-box {
  flex: 1;
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

  changeStt(id: string, stt: number) {
    this._findersService.update(id, { stt: stt }).then((res: any) => {
      this._snackService.openSnackBar('Status atualizado com sucesso!', 'success');
      this.fecharModal();
    });
  }


}
