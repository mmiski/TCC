import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularFire2/database';
import { MaterializeAction } from 'angular2-materialize';
import { RotaService } from '../services/rota.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-grid-rotas',
  templateUrl: './grid-rotas.component.html',
  styleUrls: ['./grid-rotas.component.css']
})
export class GridRotasComponent {

  listaRotas: FirebaseListObservable<any>;
  listaPontos: FirebaseListObservable<any>;
  
  msgTitulo: string = "";
  msgCorpo: string = "";
  key : string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();


    constructor(public router: Router, public _serviceRota: RotaService, public _serviceAuth: AuthService) {

      this._serviceRota.key = _serviceAuth.usuario.identificacaoCliente;
      this.listaRotas = this._serviceRota.lista();

     }
  
    novo(){
      this.show('LOADING');
      this.router.navigate(['cadRota']);
      this.close('LOADING');
    }

    gridRotaVincPass(rotaKey: string = ""){
      this.show('LOADING');
      this.router.navigate(['gridRotaVincPass', rotaKey]);
      this.close('LOADING');
    }

    rotaMapa(rotaKey: string = ""){
      this.show('LOADING');
      this.router.navigate(['rotaMapa', rotaKey]);
      this.close('LOADING');
    }

    alterar(key: string){
      this.show('LOADING');
      this.router.navigate(['cadRota', key]);
      this.close('LOADING');
    }

    excluir(key: string){
      this.show('LOADING');
      this.close('DANGER');
      this._serviceRota.deleta(key).then(() =>{
        this.close('LOADING');
        this.msgTitulo = "Exclusão Concluída"
        this.msgCorpo = "Rota foi excluida com êxito."
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
