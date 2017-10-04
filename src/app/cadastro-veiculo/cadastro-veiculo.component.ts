import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.css']
})
export class CadastroVeiculoComponent{

  constructor(public router: Router) { }

  gridVeiculo(){
    this.router.navigate(['gridVeiculo']);
  }

}
