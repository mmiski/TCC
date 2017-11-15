import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassageiroMensalidadeService } from '../services/passageiro-mensalidade.service';
import { PlanoMensalidadeService } from '../services/plano-mensalidade.service';
import { PassageiroMensalidade } from '../classes/PassageiroMensalidade';
import { AuthService } from '../services/auth.service';
import { FirebaseListObservable } from 'angularFire2/database';
import { MaterializeAction } from 'angular2-materialize';
import { PlanoMensalidade } from '../classes/PlanoMensalidade';

@Component({
  selector: 'app-cadastro-passageiro-mensalidade',
  templateUrl: './cadastro-passageiro-mensalidade.component.html',
  styleUrls: ['./cadastro-passageiro-mensalidade.component.css']
})
export class CadastroPassageiroMensalidadeComponent {

  mensalidade: PlanoMensalidadeDTO;
  passageiroMensalidade: PassageiroMensalidade;
  listaModelosMensalidade: Array<PlanoMensalidadeDTO>;

  passageiroKey: string;

  msgTitulo: string = "";
  msgCorpo: string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  dataVencimentoAction = new EventEmitter<string|MaterializeAction>();
  
  msgParams = [
    {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.8, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
    }
  ]

  dataVencimentoParams = [
    {
      selectMonths: true,
      format: 'dd/mm/yyyy', // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true // Close upon selecting a date,
    }
  ]

  constructor(public router: Router, public _servicePassageiroMensalidade: PassageiroMensalidadeService, public _serviceAuth: AuthService, public _servicePlanoMensalidade: PlanoMensalidadeService, public route: ActivatedRoute) { 
    
    this._servicePlanoMensalidade.key = _serviceAuth.usuario.identificacaoCliente;
    this.listaModelosMensalidade = new Array<PlanoMensalidadeDTO>();
    this.mensalidade = new PlanoMensalidadeDTO();
    this.passageiroMensalidade = new PassageiroMensalidade();


    this._servicePlanoMensalidade.lista().subscribe(dados => {
      dados.forEach(element => {
        let modeloCN = new PlanoMensalidadeDTO();
        modeloCN.dados = element.dados;
        modeloCN.titulo = element.titulo;
        modeloCN.valor = element.valor;
        modeloCN.$key = element.$key;
        this.listaModelosMensalidade.push(modeloCN);
      });    
    });

    this.route.params.subscribe(parans => {
      this.passageiroKey = parans['passageiroKey'];

    });
  }

  gridMensalidade(){
    this.router.navigate(['visuPassMensalidade', this.passageiroKey]);
  }

  salvar(){
    this.show('LOADING');  
      this._servicePassageiroMensalidade.isDuplicado(this.passageiroMensalidade.dataVencimento, this.passageiroMensalidade.mensalidadeKey).then(() => {
        this.passageiroMensalidade.mensalidadeKey = this.mensalidade.$key;
        this._servicePassageiroMensalidade.novo(this.passageiroMensalidade).then((dados) =>{
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
      this.gridMensalidade();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }



}
class PlanoMensalidadeDTO{
  public titulo: string = ""; 
  public dados: string = "";
  public valor: string = "";
  public $key: string = "";
}