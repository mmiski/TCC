import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModeloContrato } from '../classes/ModeloContrato';
import { ModeloContratoService } from '../services/modelo-contrato.service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-cadastro-modelo-contrato',
  templateUrl: './cadastro-modelo-contrato.component.html',
  styleUrls: ['./cadastro-modelo-contrato.component.css']
})
export class CadastroModeloContratoComponent {
  
  msgTitulo: string = "";
  msgCorpo: string = "";

  key: string = "";

  modeloContrato: ModeloContrato;
 

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
  
  constructor(public router: Router, public _serviceModeloContrato: ModeloContratoService, public route: ActivatedRoute) { 

    this.modeloContrato = new ModeloContrato();

    this.route.params.subscribe(parans => {
      let key = parans['key'];
      if (key) {
        this.key = key;
          this._serviceModeloContrato.getDados(key).subscribe(dados => {
            this.modeloContrato.titulo = dados[1].$value;
            this.modeloContrato.dados = dados[0].$value;
          });
      }
  });
  }

  gridModeloContrato(){
    this.router.navigate(['gridModeloContrato']);
  }


  salvar(){
    this.show('LOADING');
    if (this.key != null && this.key != "") {
      this._serviceModeloContrato.alterar(this.key,this.modeloContrato).then(() =>{
        this.close('LOADING');
        this.msgTitulo = "Alteração Concluída"
        this.msgCorpo = "Os dados foram atualizados com sucesso."
        this.show('SUCCESS');
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      });
    }else{
      debugger;
     
      this._serviceModeloContrato.isDuplicado(this.modeloContrato.titulo).then(() => {
        this._serviceModeloContrato.novo(this.modeloContrato).then(() =>{
          this.close('LOADING');
          this.msgTitulo = "Cadastro Concluído"
          this.msgCorpo = "Os dados foram gravados com sucesso."
          this.show('SUCCESS');
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
      this.gridModeloContrato();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }

}
