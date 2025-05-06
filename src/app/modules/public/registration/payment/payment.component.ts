import { data } from 'autoprefixer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { RegistrationService } from '../registration.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  loading = false;

  inscricao:any;

  lista = ['Bandinha','Boa Vontade','Lanchinho','Trânsito','Sociodrama']



  pagamento:any = {}

  item:any = {
    preco: 2500,
    descricao: 'Inscrição para o EJC',
    id:1
  }

  constructor(public router: Router,private _localStore: LocalStorageService, private _registrationService: RegistrationService, private _snackBarService: SnackbarService,) { }

  ngOnInit() {
    this.inscricao = this._localStore.get('USER');
    if(this.inscricao?.data.pagamento){
      this.validarStatus();
    } else {

      this._registrationService.gerarPix(this.inscricao, this.item).subscribe(
        (res:any) => {
          console.log(res)
          this.pagamento = {
            id: res.id,
            qrCode: res.charges[0].last_transaction.qr_code_url,
            link: res.charges[0].last_transaction.qr_code,
            status: res.charges[0].last_transaction.status,
          }
          this.inscricao.data.pagamento = this.pagamento;
          this._registrationService.update(this.inscricao.id, {pagamento: this.pagamento}).then(
            (res:any)=>{
              console.log(res)
            });
          this.validarStatus();
        }
      )
    }
    if (!this.inscricao?.id) {
      this.router.navigate(['/'])
    }
    if (this.inscricao?.data.stt == 2 || this.inscricao?.data.stt == 3) {
      this.router.navigate(['/inscricao/confirmacao']);
    }



  }
  ngOnDestroy(): void {
    this._localStore.remove('USER');
  }

  validarStatus(){
    const interval = setInterval(() => {
      this._registrationService.getPaymentStatus(this.inscricao.data.pagamento.id).subscribe(
        (res: any) => {
            if (res.charges[0].last_transaction.status === 'paid') {
            clearInterval(interval);
            this._snackBarService.openSnackBar('Pagamento confirmado!', 'success');
            this.goToRegistration();
            } else if (res.charges[0].last_transaction.status === 'waiting_payment') {
            console.log('Pagamento pendente, verificando novamente...');
            this.validarStatus();

            }
        },
        (err) => {
          console.error('Erro ao verificar status do pagamento:', err);
        }
      );
    }, 5000);
  }
  goToRegistration() {

    const status = {stt: this.lista.includes(this.inscricao.data.equipe) ? 2 : 3}

    this._registrationService.update(this.inscricao.id,
      status).then((res:any)=>{
      console.log(res)
      this.router.navigate(['/inscricao/confirmacao']);
    })
  }

  copyCodigo(): void {
    const codigo = this.pagamento?.link;
    if (codigo) {
      navigator.clipboard.writeText(codigo).then(() => {
        console.log('Código copiado para a área de transferência!');
        this._snackBarService.openSnackBar('Código copiado para a área de transferência!', 'success');

      }).catch(err => {
        console.error('Erro ao copiar o código: ', err);
      });
    }
  }

}
