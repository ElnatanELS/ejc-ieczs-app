import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'autoprefixer';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  loading = false;
  inscricao: any;

  constructor(
    public router: Router,
    private _localStore: LocalStorageService
  ) {}
  ngOnDestroy(): void {
    this._localStore.remove('USER');
  }

  ngOnInit() {
    this.inscricao = this._localStore.get('USER');
    this.inscricao = {
      ...this.inscricao,
      data: {
        ...this.inscricao.data,
        numeroInscricao: this.inscricao.data.numeroInscricao
          .toString()
          .padStart(4, '0'),
      },
    };
    if (!this.inscricao?.id) {
      this.router.navigate(['/']);
    }
  }
  goToRegistration() {
    this.router.navigate(['registration']);
  }

  printRecibo() {
    const printContents = document.getElementById('recibo')?.innerHTML;
    const printWindow = window.open('', 'width=302,height=600');

    if (printWindow && printContents) {
      // Espera o documento estar pronto
      printWindow.document.head.innerHTML = `
        <style>


        /* CSS global ou no component.scss */
.ticket {
margin-top: 0px;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;

}

.logo {
  width: 200px;
  margin-bottom: -5px;
}

.title {

  font-size: 86px;
  margin-top: 0px;
  margin-top: 10px;
  font-weight: bold;
}

.title-secundary{
  font-size: 0.75rem /* 12px */;
    line-height: 1rem
    margin-top: 0px;
  margin-top: 10px;
  font-weight: bold;
}
.title-ter{
  font-size: 12px /* 12px */;
    line-height: 1rem
    margin-top: 10px;
  margin-top: 10px;
}

.footer {
  margin-top: 20px;
  font-size: 12px;
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
