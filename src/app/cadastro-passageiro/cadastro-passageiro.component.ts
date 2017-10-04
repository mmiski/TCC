import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-cadastro-passageiro',
  templateUrl: './cadastro-passageiro.component.html',
  styleUrls: ['./cadastro-passageiro.component.css']
})
export class CadastroPassageiroComponent {

  dataNascimentoAction = new EventEmitter<string|MaterializeAction>();

  constructor(public router: Router) { }

  lat: number = -26.2339067;
  lng: number = -52.6722151;

  gridPassageiro(){
    this.router.navigate(['gridPassageiro']);
  }

  dataNascimentoParams = [
    {
      selectMonths: true,
      format: 'dd/mm/yyyy', // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true // Close upon selecting a date,
    }
  ]
  
}
