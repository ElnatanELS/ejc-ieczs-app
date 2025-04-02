import { LocalStorageService } from './../../../../shared/services/localStorage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { formatDateInput } from 'src/app/shared/utils/format-date.utils';

@Component({
  templateUrl: './first-acess.component.html',
  styleUrls: ['./first-acess.component.css'],
})
export class FirstAcessComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _snackBarService: SnackbarService,
    public router: Router,
    private _localStore: LocalStorageService
  ) {}

  form = this._formBuilder.group({
    nome: ['', Validators.required],
    data_nasc: ['', Validators.required],
  });

  loading = false;

  ngOnInit(): void {}

  validate() {
    this.loading = true;
    if (this.form.valid) {
      this._auth
        .filterNameAndDate(
          String(this.form.value.nome).trim().concat(' '),
          formatDateInput(String(this.form.value.data_nasc))
        )
        .subscribe((res: any) => {
          if (res[0]?.payload.doc.data().stt === 2) {
            this._snackBarService.openSnackBar(
              'Menbro já validado',
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
}
