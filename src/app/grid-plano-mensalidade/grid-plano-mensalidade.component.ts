import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-plano-mensalidade',
  templateUrl: './grid-plano-mensalidade.component.html',
  styleUrls: ['./grid-plano-mensalidade.component.css']
})
export class GridPlanoMensalidadeComponent{

  constructor(public router: Router) { }
  
  cadPlanoMensalidade(){
    this.router.navigate(['cadPlanoMens']);
  }
  
}
