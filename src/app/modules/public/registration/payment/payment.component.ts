import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  loading = false;

  constructor(public router: Router) { }

  ngOnInit() {
  }
  goToRegistration() {
    this.router.navigate(['registration']);
  }

}
