import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RegistrationService } from 'src/app/modules/public/registration/registration.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { FindersServiceService } from '../../service/finders-service.service';
import { CepService } from 'src/app/shared/services/cep/cep.service';

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
        private _cep: CepService,
        private _snackBarService: SnackbarService,
        public router: Router,
        private _localStore: LocalStorageService,
        private _findersService: FindersServiceService,
      ) {}

      form = this._formBuilder.group({
        nome: ['', Validators.required],
        cracha: ['', Validators.required],
        sexo: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        localidade: ['', Validators.required],
        uf: ['', Validators.required],
        cep: ['', Validators.required],
        cel: ['', Validators.required],
        redeSocial: [''],
        religiao: [''],
        temAlergia: ['', Validators.required],
        alergia: [''],
        temMedicamento: ['', Validators.required],
        medicamento: [''],
        temDoenca: ['', Validators.required],
        doenca: [''],
        nomeDosPaisAdotivos: ['', Validators.required],
        telDosPaisAdotivos: ['', Validators.required],
        quemConvidou: ['', Validators.required],
        telQuemConvidou: ['', Validators.required],
      });

      loading = false;

      inscricao:any ={}
  ngOnInit() {
    this.inscricao = this._localStore.get('inscricao');
  }

  create() {
    this.loading = true;
    if (this.form.valid) {
      this._findersService
        .update(this.inscricao.id, {
          ...this.form.value,
          createAt: new Date().toString(),
          stt: 5,
        })
        .then((res) => {
          console.log('resd',res);

          this._snackBarService.openSnackBar(
            'Inscrição feita com sucesso',
            'success'
          );
          this.router.navigate(['/inscricao-encontrista/confirmacao']);
          this.loading = false;
        })

    }
  }

  getCep() {
    this._cep.getCep(String(this.form.value.cep)).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

}
