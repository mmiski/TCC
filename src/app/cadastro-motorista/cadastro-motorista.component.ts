import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-cadastro-motorista',
  templateUrl: './cadastro-motorista.component.html',
  styleUrls: ['./cadastro-motorista.component.css']
})
export class CadastroMotoristaComponent {

dataEmissaoAction = new EventEmitter<string|MaterializeAction>();
dataVencimentoAction = new EventEmitter<string|MaterializeAction>();
dataNascimentoAction = new EventEmitter<string|MaterializeAction>();

  constructor(public router: Router) { }


  gridMotorista(){
    this.router.navigate(['gridMotorista']);
  }

  dataEmissaoParams = [
  {
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true, // Close upon selecting a date,
    format: 'dd/mm/yyyy'
  }
]

dataVencimentoParams = [
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
