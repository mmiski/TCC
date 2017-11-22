import { Component, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../classes/Usuario';
import { UsuarioService } from '../services/usuario.service';
import { FirebaseListObservable } from 'angularFire2/database';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-grid-usuario',
  templateUrl: './grid-usuario.component.html',
  styleUrls: ['./grid-usuario.component.css']
})
export class GridUsuarioComponent{


  listaUsuarios: Array<Usuario>;
  usuarioLogado: Usuario;
  
  msgTitulo: string = "";
  msgCorpo: string = "";
  key : string = "";

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


    constructor(public router: Router, public _serviceUsuario: UsuarioService, public _serviceAuth: AuthService) {
      this.usuarioLogado = this._serviceAuth.usuario;
      this.listaUsuarios = new Array<Usuario>();
      this._serviceUsuario.key = this.usuarioLogado.identificacaoCliente;
     this._serviceUsuario.lista().subscribe(usuarios => {
      this.listaUsuarios = new Array<Usuario>();
      usuarios.forEach(u => {
        debugger;
        if (u.uid != this.usuarioLogado.uid && u.identificacaoCliente == this.usuarioLogado.identificacaoCliente && u.isAdm == false) {
          let un = new Usuario();
          un.bloqueado = u.bloqueado;
          un.email = u.email;
          un.nome = u.nome;
          un.identificacaoCliente = u.identificacaoCliente;
          un.imagemUsuario = u.imagemUsuario;
          un.isAdm = u.isAdm;
          un.uid = u.uid;
          un.keyDuplicadoUsuario = u.keyDuplicadoUsuario;
          this.listaUsuarios.push(un);
        }
      });

     });

     }
 

    novo(){
      this.show('LOADING');
      this.router.navigate(['cadUsuario']);
      this.close('LOADING');
    }

    bloquearDesbloquear(item: Usuario){
      this.show('LOADING');
      this._serviceUsuario.bloquearDesbloquear(item).then(() => {
        this.close('LOADING');
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      });
     
    }

    excluir(key: string){
      this.show('LOADING');
      this.close('DANGER');
      this._serviceUsuario.deleta(key).then(() =>{
        this.close('LOADING');
        this.msgTitulo = "Exclusão Concluída"
        this.msgCorpo = "Area de Atuação foi excluida com êxito."
        this.show('SUCCESS');
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      });
    }

    show(tipo: string, key: string = ""){

      if (tipo.toUpperCase() == "ALERT") {
        this.alert.emit({action:"modal",params:['open']});
      }
      else if(tipo.toUpperCase() == "DANGER"){
        this.key = key;
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

}
