import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-passageiro-contrato',
  templateUrl: './passageiro-contrato.component.html',
  styleUrls: ['./passageiro-contrato.component.css']
})
export class PassageiroContratoComponent{

  lstPassageirosCollapsible = new EventEmitter<string|MaterializeAction>();
  modalDocumento = new EventEmitter<string|MaterializeAction>();
  dataVencimentoAction = new EventEmitter<string|MaterializeAction>();

  autocompleteInit = {
    'data': {'Documento +18': null, 'Documento -18': null},
    onAutocomplete: (val) => {
      console.log(val);
    },
    minLength: 1,
    limit: 20
  };


  dataVencimentoParams = [
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

  params = [
    {
      onOpen: (el) => {
        console.log("Collapsible open", el);
      },
      onClose: (el) => {
        console.log("Collapsible close", el);
      }
    }
  ];

  modelDocumentoParams = [
    {
      dismissible: true,
      complete: function() { console.log('Closed'); }
    }
  ]

  constructor() { }

  openModalDocumento() {
    this.modalDocumento.emit({action:"modal",params:['open']});
  }

  closeModalDocumento() {
    this.modalDocumento.emit({action:"modal",params:['close']});
  }

}
