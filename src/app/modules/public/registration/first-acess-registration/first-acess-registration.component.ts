import { LocalStorageService } from '../../../../shared/services/localStorage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { formatDateInput } from 'src/app/shared/utils/format-date.utils';
import { RegistrationService } from '../registration.service';

@Component({
  templateUrl: './first-acess-registration.component.html',
  styleUrls: ['./first-acess-registration.component.css'],
})
export class FirstAcessRegistrationComponent implements OnInit {
  hasCpf = false;
  buttonText = 'Validar CPF';
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
    cpf: ['', Validators.required],
    nome: [''],
    cracha: [''],
    sexo: [''],
    igreja: [''],
    cel: [''],
  });

  loading = false;

  ngOnInit(): void {}

  validate() {
    this.loading = true;
    if (this.form.valid) {
      this.form.controls.cpf.disable();
      this.form.controls.nome.setValidators([Validators.required]);
      this.form.controls.cracha.setValidators([Validators.required]);
      this.form.controls.sexo.setValidators([Validators.required]);
      this.form.controls.cel.setValidators([Validators.required]);
      this._registrationService
        .filterCpf(String(this.form.controls.cpf.value).trim())
        .subscribe((res: any) => {
          console.log(res);

          this.hasCpf = true;

          if (res[0]?.payload.doc.data().stt === 2) {
            this._snackBarService.openSnackBar(
              ' já validado',
              'success'
            );
            this.router.navigate(['login']);
          } else {

            if (res.length === 0 ) {
              this._snackBarService.openSnackBar(
                'Menbro não encontrado',
                'error'
              );
            }

            this._localStore.set('USER', {
              id: res[0]?.payload.doc.id,
              data: res[0]?.payload.doc.data(),
            });

            this.router.navigate(['new-member']);
          }

          this.loading = false;
        });
    }
  }

  create() {
    this.loading = true;
    if (this.form.valid) {
      this._registrationService
        .create({
          ...this.form.value,
          yearCreated: new Date().getFullYear().toString(),
          cpf: String(this.form.controls.cpf.value).trim(),
          stt: 1,
        })
        .then(() => {
          this._snackBarService.openSnackBar(
            'Inscrição feita com sucesso',
            'success'
          );
          // this.router.navigate(['login']);
          this.loading = false;
        })
        .catch((error) => {
          this._snackBarService.openSnackBar('Erro ao criar menbro', 'error');
          this.loading = false;
        });
    }
  }
}
