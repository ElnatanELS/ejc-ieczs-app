import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FindersServiceService } from '../service/finders-service.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { RegistrationService } from 'src/app/modules/public/registration/registration.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { users } from 'src/app/shared/utils/users';

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
  registrations: any[] = []; // Declare and initialize the registrations property
  columns = {
    numeroInscricao: 'Número de Inscrição',
    nome: 'Nome do Encontrista',
    stt: 'Status',
    responsavelTable: 'Responsável',
    actions: 'actions',
  };

  dataSource: any = {
    items: [],
  };

  userSelected: any = <any>{};
  searchTerm: any;
  filteredRegistrations: any[] = [];
  type: string = '';

  constructor(
    private _findersService: FindersServiceService,
    private _snackService: SnackbarService,
    private _registrationService: RegistrationService,
    private _auth: AuthService
  ) {}

  modalAberto = false;
  modalAbertoMudar = false;

  adicionar() {
    for (let i = 0; i < users.length; i++) {
       this._findersService.create({
            numeroInscricao: i + 1,
            stt: 4,
            login: users[i].email,
          });
      // this._auth
      //   .RegisterWithEmailAndPassword(users[i].email, users[i].password)
      //   .then((res: any) => {
      //     console.log(res);

      //   })
      //   .catch((err: any) => {
      //     console.log(err);
      //   });
    }

  }

  setModal(user: any) {
    console.log(user);

    this.userSelected = user;
    console.log(this.userSelected);

    this.abrirModal();
  }

  abrirModal() {
    this.modalAberto = true;
  }
  abrirModalMudar(type: string) {
    this.modalAbertoMudar = true;
    if (type == 'pai') {
      this.type = 'Pai adotivo';
    } else if (type == 'mae') {
      this.type = 'Mãe adotiva';
    } else if (type == 'responsavel') {
      this.type = 'Responsável';
    }
  }

  fecharModal() {
    this.modalAberto = false;
  }
  fecharModalMudar() {
    this.modalAbertoMudar = false;
  }

  ngOnInit() {
    this._findersService.read().subscribe((res: any) => {
      this.dataSource.items = res
        .map((item: any) => {
          return {
            ...item,
            responsavelTable: item.responsaveis?.[0].nome,
            numeroInscricao: String(item.numeroInscricao).padStart(4, '0'),
          };
        })
        .sort((a: any, b: any) =>
          a.numeroInscricao.localeCompare(b.numeroInscricao)
        );
      this.dataSource.originalItems = this.dataSource.items;
    });

    this._registrationService.read().subscribe((res: any) => {
      this.registrations = res
        .filter((item: any) => item.stt === 2 || item.stt === 3)
        .map((item: any) => {
          return {
            ...item,
            numeroInscricao: String(item.numeroInscricao).padStart(4, '0'),
            avatar: {
              nome: item.nome,
              cel: `(${item.cel.replace(/[^0-9]/g, '').slice(0, 2)}) ${item.cel
                .replace(/[^0-9]/g, '')
                .slice(2, 6)}-${item.cel.replace(/[^0-9]/g, '').slice(6)}`,
            },
            cpf: item.cpf
              .replace(/[^0-9]/g, '')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
          };
        })
        .sort((a: any, b: any) =>
          a.numeroInscricao.localeCompare(b.numeroInscricao)
        );
      this.filteredRegistrations = this.registrations; // Initialize filteredRegistrations
      this.filterRegistrations(); // Call the filter method to initialize the filtered list
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
      this._snackService.openSnackBar(
        'Status atualizado com sucesso!',
        'success'
      );
      this.fecharModal();
    });
  }

  // Add this method to fix the error
  filterRegistrations(): void {
    this.filteredRegistrations = this.registrations.filter((registration) =>
      registration.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Method to handle registration selection
  selectRegistration(registration: any): void {
    console.log('Selected registration:', registration);
    if (this.type == 'Pai adotivo') {
      this._findersService
        .update(this.userSelected.id, { pai: registration })
        .then((res: any) => {
          this._snackService.openSnackBar(
            'Pai aditivo atualizado com sucesso!',
            'success'
          );
          this.userSelected = { ...this.userSelected, pai: registration };
          this.fecharModalMudar();
        });
    } else if (this.type == 'Mãe adotiva') {
      this._findersService
        .update(this.userSelected.id, { mae: registration })
        .then((res: any) => {
          this._snackService.openSnackBar(
            'Mãe adotiva atualizado com sucesso!',
            'success'
          );
          this.userSelected = { ...this.userSelected, mae: registration };
          this.fecharModalMudar();
        });
    } else if (this.type == 'Responsável') {
      const updatedResponsaveis = this.userSelected.responsaveis
        ? [registration, ...this.userSelected.responsaveis]
        : [registration];

      this._findersService
        .update(this.userSelected.id, { responsaveis: updatedResponsaveis })
        .then((res: any) => {
          this._snackService.openSnackBar(
            'Responsável adicionado com sucesso!',
            'success'
          );
          this.userSelected = {
            ...this.userSelected,
            responsaveis: updatedResponsaveis,
          };
          this.fecharModalMudar();
        });
    }
  }
}
