import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-modelo-contrato',
  templateUrl: './grid-modelo-contrato.component.html',
  styleUrls: ['./grid-modelo-contrato.component.css']
})
export class GridModeloContratoComponent  {

  constructor(public router: Router) { }

  cadContrato(){
    this.router.navigate(['cadModeloContrato']);
  }

}
