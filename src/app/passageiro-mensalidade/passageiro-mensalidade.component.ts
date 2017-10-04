import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passageiro-mensalidade',
  templateUrl: './passageiro-mensalidade.component.html',
  styleUrls: ['./passageiro-mensalidade.component.css']
})
export class PassageiroMensalidadeComponent{

  constructor(public router: Router) { }
  lstPassageirosCollapsible = new EventEmitter<string|MaterializeAction>();

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

  cadPassageiroMensalidade(){
    this.router.navigate(['cadPassMensalidade']);
  }

}
