import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanoMensalidade } from '../classes/PlanoMensalidade';
import { MaterializeAction } from 'angular2-materialize';
import { PlanoMensalidadeService } from '../services/plano-mensalidade.service';

@Component({
  selector: 'app-cadastro-plano-mensalidade',
  templateUrl: './cadastro-plano-mensalidade.component.html',
  styleUrls: ['./cadastro-plano-mensalidade.component.css']
})
export class CadastroPlanoMensalidadeComponent  {

  
  msgTitulo: string = "";
  msgCorpo: string = "";

  key: string = "";

  planoMensalidade: PlanoMensalidade;
 

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
  
  constructor(public router: Router, public _servicePlanoMensalidade: PlanoMensalidadeService, public route: ActivatedRoute) { 

    this.planoMensalidade = new PlanoMensalidade();

    this.route.params.subscribe(parans => {
      let key = parans['key'];
      if (key) {
        this.key = key;
          this._servicePlanoMensalidade.getDados(key).subscribe(dados => {
            this.planoMensalidade.dados = dados[0].$value;
            this.planoMensalidade.titulo = dados[1].$value;          
            this.planoMensalidade.valor = dados[2].$value;
          });
      }
  });
  }

  gridPlanoMensalidade(){
    this.router.navigate(['gridPlanoMensalidade']);
  }


  salvar(){
    this.show('LOADING');
    if (this.key != null && this.key != "") {
      this._servicePlanoMensalidade.alterar(this.key,this.planoMensalidade).then(() =>{
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
     
      this._servicePlanoMensalidade.isDuplicado(this.planoMensalidade.titulo).then(() => {
        this._servicePlanoMensalidade.novo(this.planoMensalidade).then(() =>{
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
      this.gridPlanoMensalidade();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }


}
