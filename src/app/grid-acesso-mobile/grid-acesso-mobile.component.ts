import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-grid-acesso-mobile',
  templateUrl: './grid-acesso-mobile.component.html',
  styleUrls: ['./grid-acesso-mobile.component.css']
})
export class GridAcessoMobileComponent{

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

  constructor(public router: Router) { 
    

  }

  visualizar(tipo: number){
    this.show('LOADING');
    this.router.navigate(['listaAcessosMobile', tipo]);
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
