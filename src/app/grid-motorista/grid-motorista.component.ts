import { Component, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-grid-motorista',
  templateUrl: './grid-motorista.component.html',
  styleUrls: ['./grid-motorista.component.css']
})
export class GridMotoristaComponent {
  lstMotoristasCollapsible = new EventEmitter<string|MaterializeAction>();
  
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

  cadMotorista(){
    this.router.navigate(['cadMotorista']);
  }

}
