import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RaffleService, Sorteio } from '../raffle.service';

@Component({
  selector: 'app-raffle-view',
  templateUrl: './raffle-view.component.html',
  styleUrls: ['./raffle-view.component.css']
})
export class RaffleViewComponent implements OnInit {

  sorteio$!: Observable<Sorteio | null>;
  loading = true;
  vencedor: any | null = null;
  efeito: number | null = null;
  faltam: number = 0;

  constructor(private _raffleService:RaffleService) {}

  ngOnInit(): void {
    this.sorteio$ = this._raffleService.getUltimoResultado();

    this.sorteio$.subscribe(s => {
      if (s?.vencedor) {
        this.loading = true;

        // simula suspense de 2 segundos com números aleatórios
        const animInterval = setInterval(() => {
          this.efeito = Math.floor(Math.random() * 100) + 1;
        }, 100);

        setTimeout(() => {
          clearInterval(animInterval);
          this.vencedor = s.vencedor;
          this.faltam = this._raffleService.maxSorteios - s.jaSorteados.length;
          this.efeito = null;
          this.loading = false;
        }, 2000);
      }
    });
  }
}
