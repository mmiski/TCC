import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-cadastro-passageiro-mensalidade',
  templateUrl: './cadastro-passageiro-mensalidade.component.html',
  styleUrls: ['./cadastro-passageiro-mensalidade.component.css']
})
export class CadastroPassageiroMensalidadeComponent {



  dataVencimentoAction = new EventEmitter<string|MaterializeAction>();
  constructor(public router: Router) { }

  gridPassageiroMensalidade(){
    this.router.navigate(['passMens']);
  }

  selectOptions = [
    {value:1,name:"Mensalidade Padrão"},
    {value:2,name:"Mensalidade apenas meio ano"}
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
}
