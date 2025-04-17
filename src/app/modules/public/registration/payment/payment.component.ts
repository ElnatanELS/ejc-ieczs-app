import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  loading = false;

  inscricao:any;

  lista = ['Bandinha']

  constructor(public router: Router,private _localStore: LocalStorageService, private _registrationService: RegistrationService) { }

  ngOnInit() {
    this.inscricao = this._localStore.get('USER');
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
  goToRegistration() {

    const status = {stt: this.lista.includes(this.inscricao.data.equipe) ? 2 : 3}

    this._registrationService.update(this.inscricao.id,
      status).then((res:any)=>{
      console.log(res)
      this.router.navigate(['/inscricao/confirmacao']);
    })
  }

}
