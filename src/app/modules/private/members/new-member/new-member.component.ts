import { MemberService } from './../service/member.service';
import { ResetPasswordComponent } from './../../../public/login/reset-password/reset-password.component';
import { CepService } from './../../../../shared/services/cep/cep.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Member } from '../shared/member';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss'],
})
export class NewMemberComponent implements OnInit {
  formMember!: any;
  member: any;
  loading = false
  constructor(
    private formBuilder: FormBuilder,
    private _cep: CepService,
    private _localStore: LocalStorageService,
    public _auth: AuthService,
    private _memberService: MemberService
  ) {}
  options = [
    { id: 1, display: 'Solteiro(a)' },
    { id: 2, display: 'Casado(a)' },
    { id: 3, display: 'Divorciado(a)' },
    { id: 4, display: 'Viúvo(a)' },
    { id: 5, display: 'Separado(a) judicialmente' },
  ];

  ngOnInit() {
    this.member = this._localStore.get('USER');
    this.createForm(new Member());
  }

  createForm(member: Member) {
    this.formMember = new FormGroup({
      nome: new FormControl('', Validators.required),
      estado_civil: new FormControl('', Validators.required),
      ocupacao: new FormControl('', Validators.required),
      data_nasc: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      localidade: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      uf: new FormControl('', Validators.required),
      cel: new FormControl('', Validators.required),
      cel2: new FormControl(''),
      email: new FormControl('', Validators.required),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      data_bat_rec: new FormControl('', Validators.required),
      contato_emer: new FormControl('', Validators.required),
      tipo_de_relacao: new FormControl('', Validators.required),
      tel_contato: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_conf: new FormControl('', Validators.required),
    });

    if(this.member){

      this.formMember.patchValue(this.member.data);
    }
  }

  onSubmit() {
    if(this.formMember.valid){

      this.loading = true
      const dataMember = { ...this.member.data, ...this.formMember.value };
      this._auth.SignUp(dataMember.email, dataMember.password).finally(() => {
        delete dataMember.password;
        delete dataMember.password_conf;
        dataMember.stt = 2;

        this._memberService.update(this.member.id, dataMember).finally(() => {
          this.loading =false
          this._localStore.set('USER',{id: this.member.id, data:dataMember})
        });
      });

    }
  }

  getCep() {
    this._cep.getCep(this.formMember.value.cep).subscribe((res) => {
      this.formMember.patchValue(res);
    });
  }
}
