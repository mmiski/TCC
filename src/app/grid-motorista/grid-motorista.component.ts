import { Component, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { MaterializeAction } from 'angular2-materialize';
import { FirebaseListObservable } from 'angularFire2/database';
import { MotoristaService } from '../services/motorista.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-grid-motorista',
  templateUrl: './grid-motorista.component.html',
  styleUrls: ['./grid-motorista.component.css']
})
export class GridMotoristaComponent {

    listaMotoristas: FirebaseListObservable<any>;
    
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
  
      constructor(public router: Router, public _serviceMotorista: MotoristaService, public _serviceAuth: AuthService) {
        debugger;
        this._serviceMotorista.key = _serviceAuth.usuario.identificacaoCliente;
        this.listaMotoristas = this._serviceMotorista.lista();
  
       }
    
      novo(){
        this.show('LOADING');
        this.router.navigate(['cadMotorista']);
        this.close('LOADING');
      }
  
      alterar(key: string){
        this.show('LOADING');
        this.router.navigate(['cadMotorista', key]);
        this.close('LOADING');
      }
  
      excluir(key: string){
        this.show('LOADING');
        this.close('DANGER');
        this._serviceMotorista.deleta(key).then(() =>{
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
