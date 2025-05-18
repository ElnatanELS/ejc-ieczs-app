import { Component, OnInit } from '@angular/core';
import { RaffleService } from '../raffle.service';

@Component({
  selector: 'app-raffle-new',
  templateUrl: './raffle-new.component.html',
  styleUrls: ['./raffle-new.component.css'],
})
export class RaffleNewComponent implements OnInit {
  constructor(protected _raffleService: RaffleService) {}

  vencedor: any | null = null;
  faltam = 0;
  loading=false

  ultimosNomes: any[] = [];
  maxSorteios = 0;

  ngOnInit(): void {
    this._raffleService.getTotalSorteios().subscribe((total) => {
      this.maxSorteios = total;
       this.faltam = this.maxSorteios - this.ultimosNomes.length   ;
    });

    this._raffleService.getUltimoResultado().subscribe((s) => {
      if (s) {
        this.vencedor = s.vencedor;
        console.log(s);
        this.ultimosNomes = s.jaSorteados.sort((a: any, b: any) => s.jaSorteados.indexOf(b) - s.jaSorteados.indexOf(a));

        this.faltam = this.maxSorteios - s.jaSorteados.length   ;
      }
    });
  }

  async sortear() {
    try {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        console.log('loading', this.loading);

      }, 3000);
      console.log('loading', this.loading);
      await this._raffleService.sortear();
    } catch (error) {}
  }
}
