import { Component, OnInit } from '@angular/core';
import { RaffleService } from '../raffle.service';

@Component({
  selector: 'app-raffle-new',
  templateUrl: './raffle-new.component.html',
  styleUrls: ['./raffle-new.component.css'],
})
export class RaffleNewComponent implements OnInit {
  constructor(private _raffleService: RaffleService) {}

  vencedor: any | null = null;
  faltam = 0;

  ngOnInit(): void {
    this._raffleService.getUltimoResultado().subscribe((s) => {
      if (s) {
        this.vencedor = s.vencedor;
        console.log(s);

        this.faltam = this._raffleService.maxSorteios - s.jaSorteados.length;
      }
    });
  }

  async sortear() {
    try {
      await this._raffleService.sortear();
    } catch (error) {}
  }
}
