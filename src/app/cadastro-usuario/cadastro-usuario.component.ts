import { Component } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent  {


  constructor(public router: Router) { }


  gridUsuario(){
    this.router.navigate(['gridUsuario']);
  }
}
