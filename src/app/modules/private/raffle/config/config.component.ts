import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/modules/public/registration/registration.service';
import { cpfValidator } from 'src/app/shared/utils/validators/validators';
import { RaffleNewModule } from '../raffle-new/raffle-new.module';
import { RaffleService } from '../raffle.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(
     private _formBuilder: FormBuilder,

        private raffleService: RaffleService
  ) { }

  ngOnInit() {
  }

 form = this._formBuilder.group({
     numero: ['', [Validators.required]],

   });

   create(){
    if(this.form.valid){
      this.raffleService.maxSorteios.set(Number(this.form.value.numero));
      console.log('tes', this.raffleService.maxSorteios() );

    } else {
      console.log('formulario invalido')
    }
   }

}
