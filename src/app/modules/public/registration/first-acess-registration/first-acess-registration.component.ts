import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { cpfValidator } from 'src/app/shared/utils/validators/validators';
import { LocalStorageService } from '../../../../shared/services/localStorage/local-storage.service';
import { RegistrationService } from '../registration.service';

@Component({
  templateUrl: './first-acess-registration.component.html',
  styleUrls: ['./first-acess-registration.component.css'],
})
export class FirstAcessRegistrationComponent implements OnInit, OnDestroy {
  hasCpf = false;
  buttonText = 'Validar Inscrição';
  buttonText2 = 'Fazer Inscrição';
  subscription: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _snackBarService: SnackbarService,
    public router: Router,
    private _localStore: LocalStorageService,
    private _registrationService: RegistrationService
  ) {}


  form = this._formBuilder.group({
    cpf: ['', [Validators.required, cpfValidator()]],
    nome: [''],
    email: [''],
    cracha: [''],
    sexo: [''],
    igreja: [''],
    cel: [''],
    equipe: [''],
    redeSocial: [''],
    termo: [false],
  });

  loading = false;

  equipeOptions = [
    { display: 'Bandinha', id: 'Bandinha' },
    { display: 'Boa Vontade', id: 'Boa Vontade' },
    { display: 'Lanchinho', id: 'Lanchinho' },
    { display: 'Trânsito', id: 'Trânsito' },
    { display: 'Sociodrama', id: 'Sociodrama' },
    { display: 'EDG', id: 'EDG' },
    { display: 'Secretaria', id: 'Secretaria' },
    { display: 'Recepção', id: 'Recepção' },
    { display: 'Garçons', id: 'Garçons' },
    { display: 'Ordem', id: 'Ordem' },
    { display: 'Cozinha e Mini Mercado', id: 'Cozinha e Mini Mercado' },
    { display: 'Lanchonete', id: 'Lanchonete' },
    { display: 'Compras', id: 'Compras' },
    { display: 'Som', id: 'Som' },
    { display: 'Círculos', id: 'Círculos' },
    { display: 'Externa', id: 'Externa' },
    { display: 'Vigília', id: 'Vigília' },
    { display: 'Ornamentação', id: 'Ornamentação' },
    { display: 'Equipe Médica', id: 'Equipe Médica' },
    { display: 'Casal Apresentador', id: 'Casal Apresentador' },
  ];

  ngOnInit(): void {
    this._localStore.clear()
  }

   ngOnDestroy(): void {
   this.subscription?.unsubscribe();
  }

  validate() {
    this.loading = true;
    if (this.form.valid) {
      this.form.controls.cpf.disable();
      this.form.controls.nome.setValidators([Validators.required]);
      this.form.controls.cracha.setValidators([Validators.required]);
      this.form.controls.sexo.setValidators([Validators.required]);
      this.form.controls.cel.setValidators([Validators.required]);
      this.form.controls.igreja.setValidators([Validators.required, Validators.minLength(5)]);
      this.form.controls.email.setValidators([Validators.required, Validators.email]);
      this.form.controls.equipe.setValidators([Validators.required]);
      this.form.controls.redeSocial.setValidators([Validators.required]);
      this.form.controls.termo.setValidators( [Validators.requiredTrue]);
      this.subscription = this._registrationService
        .filterCpf(String(this.form.controls.cpf.value).trim())
        .subscribe((res: any) => {

          console.log('res', res);

          if (res[0]) {

            this._localStore.set('USER', {
              id: res[0]?.id,
              data: res[0],
            });

            if (res[0]?.stt == 2 || res[0]?.stt == 3) {
              this.router.navigate(['/inscricao/confirmacao']);

            }
            if (res[0]?.stt == 1) {
              this.router.navigate(['/inscricao/pagamento']);

            }
          } else {
            this.hasCpf = true;

            // if (res.length === 0 ) {
            //   this._snackBarService.openSnackBar(
            //     'Menbro não encontrado',
            //     'error'
            //   );
            // }


            // this.router.navigate(['new-member']);
          }

          this.loading = false;
        });
    }
  }

  create() {
    this.loading = true;
    if (this.form.valid) {
      this._registrationService
        .addItem({
          ...this.form.value,
          yearCreated: new Date().toString(),
          cpf: String(this.form.controls.cpf.value).trim(),
          stt: 1,
        })
        .subscribe((res) => {

          this._snackBarService.openSnackBar(
            'Inscrição feita com sucesso',
            'success'
          );
          // this.router.navigate(['login']);
          this.loading = false;
        })

    }
  }

  modalAberto = false;
 abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }
}
