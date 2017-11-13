import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { FirebaseListObservable } from 'angularFire2/database';
import { Router } from '@angular/router';
import { PassageiroService } from '../services/passageiro.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-passageiro-contrato',
  templateUrl: './passageiro-contrato.component.html',
  styleUrls: ['./passageiro-contrato.component.css']
})
export class PassageiroContratoComponent{


  listaPassageiros: FirebaseListObservable<any>;

  msgTitulo: string = "";
  msgCorpo: string = "";

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

  constructor(public router: Router, public _servicePassageiro: PassageiroService, public _serviceAuth: AuthService) {
    this._servicePassageiro.key = _serviceAuth.usuario.identificacaoCliente;

    this.listaPassageiros = this._servicePassageiro.lista();

   }

   novo(key: string = ""){
    this.show('LOADING');
    this.router.navigate(['cadPassContrato', key]);
    this.close('LOADING');
   }

   visualizar(key: string = ""){
    this.show('LOADING');
    this.router.navigate(['visuPassContrato', key]);
    this.close('LOADING');
  }

  show(tipo: string, key: string = ""){
    
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

}

