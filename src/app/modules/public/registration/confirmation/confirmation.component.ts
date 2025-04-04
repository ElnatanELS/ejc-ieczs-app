import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    if (!this.inscricao?.id) {
      this.router.navigate(['/']);
    }
  }
  goToRegistration() {
    this.router.navigate(['registration']);
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
