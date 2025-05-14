import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  inscricao: any;

  constructor(  public router: Router,
      private _localStore: LocalStorageService,
      private _auth: AuthService,
    ) { }

  ngOnDestroy(): void {
    this._localStore.remove('inscricao');
    this._auth.SignOutFinders()
  }

  ngOnInit() {
    this.inscricao = this._localStore.get('inscricao');



  }

  teste(){
    this._auth.SignInFinders('ficha02@ejc.ieczs','ficha02@ejc.ieczs').then(() => {
    }
    ).catch((err) => {
      console.log(err)
    }

    )
  }

}
