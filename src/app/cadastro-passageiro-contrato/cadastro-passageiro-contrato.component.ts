import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassageiroContratoService } from '../services/passageiro-contrato.service';
import { ModeloContratoService } from '../services/modelo-contrato.service';
import { PassageiroContrato } from '../classes/PassageiroContrato';
import { AuthService } from '../services/auth.service';
import { FirebaseListObservable } from 'angularFire2/database';
import { MaterializeAction } from 'angular2-materialize';
import { ModeloContrato } from '../classes/ModeloContrato';

@Component({
  selector: 'app-cadastro-passageiro-contrato',
  templateUrl: './cadastro-passageiro-contrato.component.html',
  styleUrls: ['./cadastro-passageiro-contrato.component.css']
})
export class CadastroPassageiroContratoComponent {

  contrato: ModeloContratoDTO;
  passageiroContrato: PassageiroContrato;
  listaModelosContrato: Array<ModeloContratoDTO>;

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

  constructor(public router: Router, public _servicePassageiroContrato: PassageiroContratoService, public _serviceAuth: AuthService, public _serviceModeloContrato: ModeloContratoService, public route: ActivatedRoute) { 
    
    this._serviceModeloContrato.key = _serviceAuth.usuario.identificacaoCliente;
    this.listaModelosContrato = new Array<ModeloContratoDTO>();
    this.contrato = new ModeloContratoDTO();
    this.passageiroContrato = new PassageiroContrato();


    this._serviceModeloContrato.lista().subscribe(dados => {
      dados.forEach(element => {
        let modeloCN = new ModeloContratoDTO();
        modeloCN.dados = element.dados;
        modeloCN.titulo = element.titulo;
        modeloCN.$key = element.$key;
        this.listaModelosContrato.push(modeloCN);
      });    
    });

    this.route.params.subscribe(parans => {
      this.passageiroKey = parans['passageiroKey'];

    });
  }

  gridContrato(){
    this.router.navigate(['visuPassContrato', this.passageiroKey]);
  }

  salvar(){
    this.show('LOADING');  
      this._servicePassageiroContrato.isDuplicado(this.passageiroContrato.dataVencimento).then(() => {
        this.passageiroContrato.contratoKey = this.contrato.$key;
        this._servicePassageiroContrato.novo(this.passageiroContrato).then((dados) =>{
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
      this.gridContrato();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }



}
class ModeloContratoDTO{
  public titulo: string = ""; 
  public dados: string = "";
  public $key: string = "";
}