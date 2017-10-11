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
alert = new EventEmitter<string|MaterializeAction>();
success = new EventEmitter<string|MaterializeAction>();
danger = new EventEmitter<string|MaterializeAction>();  
loading = new EventEmitter<string|MaterializeAction>();

msgParams = [
  {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.8, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
  }
]

msgTitulo: string = "";
msgCorpo: string = "";


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


  show(tipo: string){
    if (tipo.toUpperCase() == "ALERT") {
      this.alert.emit({action:"modal",params:['open']});
    }
    else if(tipo.toUpperCase() == "DANGER"){
      this.danger.emit({action:"modal",params:['open']});
    }
    else if(tipo.toUpperCase() == "SUCCESS"){
      this.success.emit({action:"modal",params:['open']});
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['open']});
    }
  }
  
  close(tipo: string){
    if (tipo.toUpperCase() == "ALERT") {
      this.alert.emit({action:"modal",params:['close']});
    }
    else if(tipo.toUpperCase() == "DANGER"){
      this.danger.emit({action:"modal",params:['close']});
    }
    else if(tipo.toUpperCase() == "SUCCESS"){
      this.success.emit({action:"modal",params:['close']});
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }

  salvar(){
    this.show('LOADING');
    this._serviceUsuario.salvaUsuario(this.usuario).then(() => {
      this.close('LOADING');
      this.msgTitulo = "Concluído";
      this.msgCorpo = "Dados do usuário salvos com sucesso!";
      this.show('SUCCESS');
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });
  }

  deletarUsuario(){
    this.close('DANGER');
    this.show('LOADING');
    this._serviceAuth.lstUsuariosCliente(this.usuario.identificacaoCliente).subscribe((dados) => {
      if (dados.length <= 1) {
        this.excluirFull();
      }else{
        this.excluirNormal();
      }
    });    
  }

  excluirFull(){
    this._serviceCliente.deletaCliente(this.usuario.identificacaoCliente).then(() => {
      this._serviceAuth.excluiUsuarioDataBase(this.usuario.keyDuplicadoUsuario).then(() =>{   
        this._serviceAuth.excluiUsuario().then(() => {
          this.close('LOADING');
          window.location.reload()
        }).catch(err => {
          this.close('LOADING');
          this.msgTitulo = "Atenção";
          this.msgCorpo = err.message;
          this.show('ALERT');
        })  
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      });
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });
  }

  excluirNormal(){
    this._serviceAuth.excluiUsuarioDataBase(this.usuario.keyDuplicadoUsuario).then(() =>{   
      this._serviceAuth.excluiUsuario().then(() => {
        this.close('LOADING');
        window.location.reload()
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      })  
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });
  }

  vincularConta(tipoLogin: number){
    this.show('LOADING');
    let provider = tipoLogin == 1 ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider();
    this._serviceAuth.afAuth.auth.currentUser.linkWithPopup(provider).then(() => {
      this.close('LOADING');
      window.location.reload();
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });    
}

isDeletarCliente(): boolean{
  let retorno: boolean = false;
    this._serviceAuth.lstUsuariosCliente(this.usuario.identificacaoCliente).subscribe((dados) => {
      debugger;
      if (dados.length <= 1) {
        retorno = true;
      }
    });

    return retorno;
}

}
