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

  ultimosNomes: any[] = [];
  maxSorteios = 0;

  ngOnInit(): void {
    this.maxSorteios = this._raffleService.maxSorteios();

    this._raffleService.getUltimoResultado().subscribe((s) => {
      if (s) {
        this.vencedor = s.vencedor;
        console.log(s);
        this.ultimosNomes = s.jaSorteados.sort((a: any, b: any) => s.jaSorteados.indexOf(b) - s.jaSorteados.indexOf(a));
        this.maxSorteios = this._raffleService.maxSorteios();

        this.faltam = this._raffleService.maxSorteios() - s.jaSorteados.length;
      }
    });
  }

  async sortear() {
    try {
      await this._raffleService.sortear();
    } catch (error) {}
  }
}
