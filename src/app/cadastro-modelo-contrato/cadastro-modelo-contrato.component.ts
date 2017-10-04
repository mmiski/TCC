import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-modelo-contrato',
  templateUrl: './cadastro-modelo-contrato.component.html',
  styleUrls: ['./cadastro-modelo-contrato.component.css']
})
export class CadastroModeloContratoComponent {
  
    constructor(public router: Router) { }

  gridModeloContrato(){
    this.router.navigate(['gridModeloContrato']);
  }

}
