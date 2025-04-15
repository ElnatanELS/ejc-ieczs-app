import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { RegistrationService } from '../../public/registration/registration.service';
import { FindersServiceService } from '../finders/service/finders-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _registrationService: RegistrationService, private _findersService:FindersServiceService) { }

  encontristas: any = []
  encontristasConcluidos: any = 0;
  encontreiros: any = []

  ngOnInit() {
    this._registrationService.read().subscribe((res: any) => {
     this.encontreiros = res.map((item: any) => {
        return {
          ...item,
          numeroInscricao:String(item.numeroInscricao).padStart(4, '0') ,
          avatar: {
            nome: item.nome,
            cel: `(${item.cel.replace(/[^0-9]/g, '').slice(0, 2)}) ${item.cel.replace(/[^0-9]/g, '').slice(2, 6)}-${item.cel.replace(/[^0-9]/g, '').slice(6)}`,
          },
          cpf: item.cpf.replace(/[^0-9]/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
        };
      }).sort((a: any, b: any) => a.numeroInscricao.localeCompare(b.numeroInscricao));

      this.chartRegistration();

    });
    this._findersService.read().subscribe((res: any) => {
     this.encontristas = res.map((item: any) => {
        return {
          ...item,
          numeroInscricao:String(item.numeroInscricao).padStart(4, '0') ,
        };
      }).sort((a: any, b: any) => a.numeroInscricao.localeCompare(b.numeroInscricao));

      this.chartFinders();

    });
  }

  chartType: ChartType = 'pie';

  chartData: ChartData<'pie'> | undefined;

  chartOptions: ChartOptions | undefined ;

  chartDataFinders: ChartData<'pie'> | undefined;

  chartOptionsFinders: ChartOptions | undefined ;

  chartRegistration(){
    this.chartData = {
      labels: ['Aguardando Pagamento', 'Aguardando a Carta', 'Finalizado'],
      datasets: [
        {
          label: 'quantas inscrições:',
          data: [
            this.encontreiros.filter((item: any) => item.stt === 1).length,
            this.encontreiros.filter((item: any) => item.stt === 2).length,
            this.encontreiros.filter((item: any) => item.stt === 3).length
          ],
          backgroundColor: ['#ef4444', '#f97316', '#22c55e'],
          hoverBackgroundColor: ['#dc2626', '#ea580c', '#15803d'],
          hoverBorderColor: ['#fff', '#fff', '#fff'],
          borderColor: ['#fff', '#fff'],
          borderWidth: 2
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#4b5563',
            font: {
              size: 14
            }
          }
        }
      }
    };
  }
  chartFinders(){
    this.chartDataFinders = {
      labels: ['Aguardando Preenchimento', 'Aguardando Documento', 'Finalizado'],
      datasets: [
        {
          label: 'quantas inscrições:',
          data: [
            this.encontristas.filter((item: any) => item.stt === 4).length,
            this.encontristas.filter((item: any) => item.stt === 5).length,
            this.encontristas.filter((item: any) => item.stt === 3).length
          ],
          backgroundColor: ['#ef4444', '#f97316', '#22c55e'],
          hoverBackgroundColor: ['#dc2626', '#ea580c', '#15803d'],
          hoverBorderColor: ['#fff', '#fff', '#fff'],
          borderColor: ['#fff', '#fff'],
          borderWidth: 2
        }
      ]
    };

    this.chartOptionsFinders = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#4b5563',
            font: {
              size: 14
            }
          }
        }
      }
    };

    this.encontristasConcluidos = this.encontristas.filter((item: any) => item.stt === 3).length;
  }

}
