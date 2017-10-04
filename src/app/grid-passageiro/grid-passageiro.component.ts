import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-grid-passageiro',
  templateUrl: './grid-passageiro.component.html',
  styleUrls: ['./grid-passageiro.component.css']
})
export class GridPassageiroComponent {

  lstPassageirosCollapsible = new EventEmitter<string|MaterializeAction>();

  constructor(public router: Router) { }

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

  cadPassageiro(){
    this.router.navigate(['cadPassageiro']);
  }
}
