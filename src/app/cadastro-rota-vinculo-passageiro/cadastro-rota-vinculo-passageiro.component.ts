import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-rota-vinculo-passageiro',
  templateUrl: './cadastro-rota-vinculo-passageiro.component.html',
  styleUrls: ['./cadastro-rota-vinculo-passageiro.component.css']
})
export class CadastroRotaVinculoPassageiroComponent {

  constructor(public router: Router) { }

  lat: number = -26.2339067;
  lng: number = -52.6722151;

  autocompleteInit = {
    'data': {'João Damasceno': null, 'Natalia Aleaterde': null, 'Mario Toscano': null, 'Matheus Malinovski': null},
    onAutocomplete: (val) => {
      console.log(val);
    },
    minLength: 1,
    limit: 20
  };

  gridRotaVincPass(){
    this.router.navigate(['rotaVincPass']);
  }

}
