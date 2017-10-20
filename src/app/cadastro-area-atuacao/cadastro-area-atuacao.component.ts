import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { AreaAtuacaoService } from '../services/area-atuacao.service';
import { AreaAtuacao } from '../classes/AreaAtuacao';

@Component({
  selector: 'app-cadastro-area-atuacao',
  templateUrl: './cadastro-area-atuacao.component.html',
  styleUrls: ['./cadastro-area-atuacao.component.css']
})
export class CadastroAreaAtuacaoComponent {

  msgTitulo: string = "";
  msgCorpo: string = "";

  key: string = "";

  areaAtuacao: AreaAtuacao;
 

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
  
  constructor(public router: Router, public _serviceAreaAtuacao: AreaAtuacaoService, public route: ActivatedRoute) { 

    this.areaAtuacao = new AreaAtuacao();

    this.route.params.subscribe(parans => {
      let key = parans['key'];
debugger;
      if (key) {
        this.key = key;
        debugger;
          this._serviceAreaAtuacao.getDados(key).subscribe(dados => {
            debugger;
            this.areaAtuacao.cep = dados[0].$value;
            this.areaAtuacao.descricao = dados[1].$value;
            this.areaAtuacao.isMatutino = dados[2].$value;
            this.areaAtuacao.isNoturno = dados[3].$value;
            this.areaAtuacao.isVespertino = dados[4].$value;
            this.areaAtuacao.locais = dados[5].$value;
          });
      }
  });
  }

  gridAreaAtuacao(){
    this.router.navigate(['areaAtuacao']);
  }

  salvar(){
    this.show('LOADING');
    if (this.key != null && this.key != "") {
      this._serviceAreaAtuacao.alterar(this.key,this.areaAtuacao).then(() =>{
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
     
      this._serviceAreaAtuacao.isDuplicado(this.areaAtuacao.descricao).then(() => {
        this._serviceAreaAtuacao.novo(this.areaAtuacao).then(() =>{
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
      this.gridAreaAtuacao();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }
}
