import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularFire2/database';
import { MaterializeAction } from 'angular2-materialize';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-grid-veiculo',
  templateUrl: './grid-veiculo.component.html',
  styleUrls: ['./grid-veiculo.component.css']
})
export class GridVeiculoComponent {

  listaVeiculos: FirebaseListObservable<any>;
  
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


    constructor(public router: Router, public _serviceVeiculo: VeiculoService) {
      debugger;
      this.listaVeiculos = this._serviceVeiculo.lista;

     }
  
    novo(){
      this.show('LOADING');
      this.router.navigate(['cadVeiculo']);
      this.close('LOADING');
    }

    alterar(key: string){
      this.show('LOADING');
      this.router.navigate(['cadVeiculo', key]);
      this.close('LOADING');
    }

    excluir(key: string){
      this.show('LOADING');
      this.close('DANGER');
      this._serviceVeiculo.deleta(key).then(() =>{
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
