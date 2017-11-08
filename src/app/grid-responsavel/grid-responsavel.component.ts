import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { ResponsavelService } from '../services/responsavel.service';
import { FirebaseListObservable } from 'angularFire2/database';

@Component({
  selector: 'app-grid-responsavel',
  templateUrl: './grid-responsavel.component.html',
  styleUrls: ['./grid-responsavel.component.css']
})
export class GridResponsavelComponent{

  listaResponsaveis: FirebaseListObservable<any>;
  
  msgTitulo: string = "";
  msgCorpo: string = "";
  key : string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  responsavelCollapsible = new EventEmitter<string|MaterializeAction>();
  
  msgParams = [
    {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.8, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
    }
  ]



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

    constructor(public router: Router, public _serviceResponsavel: ResponsavelService) {
      debugger;
      this.listaResponsaveis = this._serviceResponsavel.listaResponsaveis;

     }
  
    novo(){
      this.show('LOADING');
      this.router.navigate(['cadResponsavel']);
      this.close('LOADING');
    }

    alterar(key: string){
      this.show('LOADING');
      this.router.navigate(['cadResponsavel', key]);
      this.close('LOADING');
    }

    excluir(key: string){
      this.show('LOADING');
      this.close('DANGER');
      this._serviceResponsavel.deleta(key).then(() =>{
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
