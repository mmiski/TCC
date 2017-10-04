import { Component, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from '../classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { ClienteService } from '../services/cliente.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-configuracao-usuario',
  templateUrl: './configuracao-usuario.component.html',
  styleUrls: ['./configuracao-usuario.component.css']
})
export class ConfiguracaoUsuarioComponent {

usuario: Usuario;

vinculoCollapsible = new EventEmitter<string|MaterializeAction>();

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

  constructor(public _serviceAuth: AuthService, public _serviceUsuario: UsuarioService, public _serviceCliente: ClienteService, public router: Router) { 
    this.usuario = this._serviceAuth.getDadosUsuarioDataBase(0);
  }


  salvar(){
    this._serviceUsuario.salvaUsuario(this.usuario);
  }

  deletarUsuario(){
    if (this.isDeletarCliente()) {
      this._serviceCliente.deletaCliente(this.usuario.identificacaoCliente);
    }
    this._serviceAuth.excluiUsuarioDataBase(this.usuario.keyDuplicadoUsuario).then(() =>{
      this._serviceAuth.excluiUsuario().then(() => window.location.reload());    
    })
  }

  vincularConta(tipoLogin: number){
    let provider = tipoLogin == 1 ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider();
    this._serviceAuth.afAuth.auth.currentUser.linkWithPopup(provider).then(() => window.location.reload())
    .catch((err) => {
      console.log(err);
    });    
}

isDeletarCliente(): boolean{
  let retorno = false;
    this._serviceAuth.lstUsuariosCliente(this.usuario.identificacaoCliente).subscribe((dados) => {
      if (dados.length <= 1) {
        retorno = true;
      }
    });

    return retorno;
}

}
