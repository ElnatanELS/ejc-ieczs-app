import { data } from 'autoprefixer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { RegistrationService } from '../registration.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  loading = false;

  inscricao: any;

  lista = ['Bandinha', 'Boa Vontade', 'Lanchinho', 'Trânsito', 'Sociodrama'];

  pagamento: any = {};

  item: any = {
    preco: 100,
    descricao: 'Inscrição para o EJC',
    id: 1,
  };
  loadingPix = false;

  subscription: any;

  constructor(
    public router: Router,
    private _localStore: LocalStorageService,
    private _registrationService: RegistrationService,
    private _snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.loadingPix = true;
    this.inscricao = this._localStore.get('USER');
    this.subscription = this._registrationService
      .filterCpf(this.inscricao.data.cpf)
      .subscribe((res: any) => {
      if (res[0]) {
        console.log('entrou', res[0]);
         this._localStore.set('USER', {
          id: res[0]?.id,
          data: res[0],
        });

        if (!res[0].pagamento) {
        this.gerarPix();

        } else {
        this.pagamento = res[0].pagamento;
        //  this.iniciarContador();
        this.loadingPix = false;
        }
        if (!res[0].id) {
        this.router.navigate(['/']);
        }
        if (res[0].stt == 2 || res[0].stt == 3) {
        this.router.navigate(['/inscricao/confirmacao']);
        }

        if (res[0].pagamento?.status === 'paid') {
        this._snackBarService.openSnackBar(
          'Pagamento confirmado!',
          'success'
        );
        this.goToRegistration();
        }
      }
      });
  }
  ngOnDestroy(): void {
    console.log('Destruindo componente de pagamento');

    this._localStore.remove('USER');

    this.subscription?.unsubscribe();
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
  }

  statusNaoPago = true;

  validarStatus() {
    this._registrationService
      .getPaymentStatus(this.inscricao.data.pagamento.id)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          this.loadingPix = false;
          const status = res.charges[0].last_transaction.status;
          if (status === 'paid') {
            this._snackBarService.openSnackBar(
              'Pagamento confirmado!',
              'success'
            );
            this.goToRegistration();
          } else if (status === 'waiting_payment') {
            console.log('Pagamento pendente, verificando novamente...');
            setTimeout(() => this.validarStatus(), 5000);
          }
        },
        (err) => {
          console.error('Erro ao verificar status do pagamento:', err);
        }
      );
  }
  goToRegistration() {
    const status = {
      stt: this.lista.includes(this.inscricao.data.equipe) ? 2 : 3,
      tipoDePagamento: 'Pix',
    };

    this._registrationService
      .update(this.inscricao.id, status)
      .then((res: any) => {
        console.log(res);
        this.router.navigate(['/inscricao/confirmacao']);
      });
  }

  copyCodigo(): void {
    const codigo = this.pagamento?.link;
    if (codigo) {
      navigator.clipboard
        .writeText(codigo)
        .then(() => {
          console.log('Código copiado para a área de transferência!');
          this._snackBarService.openSnackBar(
            'Código copiado para a área de transferência!',
            'success'
          );
        })
        .catch((err) => {
          console.error('Erro ao copiar o código: ', err);
        });
    }
  }

  gerarPix() {
    this.loadingPix = true;
    this._registrationService
      .gerarPix(this.inscricao, this.item)
      .subscribe((res: any) => {
        console.log(res);
        this.pagamento = {
          id: res.id,
          qrCode: res.charges[0].last_transaction.qr_code_url,
          link: res.charges[0].last_transaction.qr_code,
          status: res.charges[0].last_transaction.status,
        };
        //  this.iniciarContador();
        this.inscricao.data.pagamento = this.pagamento;
        this.loadingPix = false;
        this._registrationService
          .update(this.inscricao.id, { pagamento: this.pagamento })
          .then((res: any) => {
            console.log(res);
          });
      });
  }

  // contador: number = 600;
  // intervalId: any;

  // minutes: number = Math.floor(this.contador / 60);
  // seconds: number = this.contador % 60;
  // formatTime(time: number): string {
  //   return time < 10 ? `0${time}` : `${time}`;
  // }
  // iniciarContador() {
  //   this.contador = 600;
  //   this.intervalId = setInterval(() => {
  //     if (this.contador > 0) {
  //       this.contador--;
  //     } else {
  //       clearInterval(this.intervalId);
  //       this._snackBarService.openSnackBar(
  //         'Tempo expirado! Gere um novo código Pix.',
  //         'warning'
  //       );
  //     }
  //   }, 1000);
  // }




}
