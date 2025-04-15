import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RegistrationService } from 'src/app/modules/public/registration/registration.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  hasCpf = false;
      buttonText = 'Validar Inscrição';
      buttonText2 = 'Fazer Inscrição';
      constructor(
        private _formBuilder: FormBuilder,
        private _auth: AuthService,
        private _snackBarService: SnackbarService,
        public router: Router,
        private _localStore: LocalStorageService,
        private _registrationService: RegistrationService
      ) {}

      form = this._formBuilder.group({
        nome: [''],
        cracha: [''],
        sexo: [''],
        dataNascimento: [''],
        rua: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        estado: [''],
        cep: [''],
        cel: [''],
        redeSocial: [''],
        religiao: [''],
        temAlergia: [''],
        alergia: [''],
        temMedicamento: [''],
        medicamento: [''],
        temDoenca: [''],
        doenca: [''],
        nomeDosPaisAdotivos: [''],
        telDosPaisAdotivos: [''],
        quemConvidou: [''],
        telQuemConvidou: [''],
      });

      loading = false;

  ngOnInit() {
  }

}
