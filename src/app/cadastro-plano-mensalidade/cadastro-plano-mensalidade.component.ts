import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-plano-mensalidade',
  templateUrl: './cadastro-plano-mensalidade.component.html',
  styleUrls: ['./cadastro-plano-mensalidade.component.css']
})
export class CadastroPlanoMensalidadeComponent  {

  
    constructor(public router: Router) { }

    gridPlanoMens(){
      this.router.navigate(['gridPlanoMens']);
    }

}
