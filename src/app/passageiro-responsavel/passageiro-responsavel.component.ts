import { Component, EventEmitter} from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';


@Component({
  selector: 'app-passageiro-responsavel',
  templateUrl: './passageiro-responsavel.component.html',
  styleUrls: ['./passageiro-responsavel.component.css']
})
export class PassageiroResponsavelComponent {

 
  lstPassageirosCollapsible = new EventEmitter<string|MaterializeAction>();
  modalResponsavel = new EventEmitter<string|MaterializeAction>();

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

  modalResponsavelParams = [
    {
      dismissible: true,
      complete: function() { console.log('Closed'); }
    }
  ]

  constructor() { }

  openModalResponsavel() {
    this.modalResponsavel.emit({action:"modal",params:['open']});
  }

  closeModalResponsavel() {
    this.modalResponsavel.emit({action:"modal",params:['close']});
  }

}
