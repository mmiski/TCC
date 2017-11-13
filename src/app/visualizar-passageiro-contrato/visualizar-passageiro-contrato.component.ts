import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { PassageiroContratoService } from '../services/passageiro-contrato.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularFire2/database';

@Component({
  selector: 'app-visualizar-passageiro-contrato',
  templateUrl: './visualizar-passageiro-contrato.component.html',
  styleUrls: ['./visualizar-passageiro-contrato.component.css']
})
export class VisualizarPassageiroContratoComponent {

  listaContratos: FirebaseListObservable<any>;

  msgTitulo: string = "";
  msgCorpo: string = "";
  key: string = "";

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

  constructor(public router: Router, public route: ActivatedRoute, public _servicePassageiroContrato: PassageiroContratoService, public _serviceAuth: AuthService) { 


    this.route.params.subscribe(parans => {
      let key = parans['key'];
        if (key) {
        this.key = key;
        this._servicePassageiroContrato.clienteKey = _serviceAuth.usuario.identificacaoCliente;
        this._servicePassageiroContrato.passageiroKey = key;
        this.listaContratos = this._servicePassageiroContrato.lista();
        }
      });
  }

  gridContrato(){
    this.router.navigate(['gridContrato']);
  }

  excluir(key: string = ""){
    this.show('LOADING');
    this.close('DANGER');
    this._servicePassageiroContrato.deleta(key).then(() =>{
      this.close('LOADING');
      this.msgTitulo = "Exclusão Concluída"
      this.msgCorpo = "Contrato foi excluido com êxito."
      this.show('SUCCESS');
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });
  }

  assinar(assinado: boolean = false, key:string = ""){
    this.show('LOADING');
    this._servicePassageiroContrato.assinar(assinado, key).then(() =>{
      this.close('LOADING');
      this.msgTitulo = "Contrato Assinado"
      this.msgCorpo = "O contrato foi assinado com sucesso."
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
