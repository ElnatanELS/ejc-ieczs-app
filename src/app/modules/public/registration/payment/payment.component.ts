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

  constructor(public router: Router,private _localStore: LocalStorageService, private _registrationService: RegistrationService) { }

  ngOnInit() {
    this.inscricao = this._localStore.get('USER');
    if (!this.inscricao?.id) {
      this.router.navigate(['/'])
    }
    if (this.inscricao?.stt == 2) {
      this.router.navigate(['/inscricao/confirmacao']);
    }

  }
  ngOnDestroy(): void {
    this._localStore.remove('USER');
  }
  goToRegistration() {
    this._registrationService.update(this.inscricao.id,{stt:2}).then((res:any)=>{
      console.log(res)
      this.router.navigate(['/inscricao/confirmacao']);
    })
  }

}
