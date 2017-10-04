import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-cadastro-rotas',
  templateUrl: './cadastro-rotas.component.html',
  styleUrls: ['./cadastro-rotas.component.css']
})
export class CadastroRotasComponent{

  horarioInicio = new EventEmitter<string|MaterializeAction>();
  horarioTermino = new EventEmitter<string|MaterializeAction>();
  lat: number = -26.2339067;
  lng: number = -52.6722151;
  selectOptions = [
    {value:1,name:"DE"},
    {value:2,name:"PARA"}
  ]

  constructor(public router: Router) { }
  

  gridRotas(){
    this.router.navigate(['gridRota']);
  }

}
