import { Component,EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rota-vinculo-passageiro',
  templateUrl: './rota-vinculo-passageiro.component.html',
  styleUrls: ['./rota-vinculo-passageiro.component.css']
})
export class RotaVinculoPassageiroComponent {

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
  
    cadRotaPassageiro(){
      this.router.navigate(['cadRotaVincPass']);
    }
}
