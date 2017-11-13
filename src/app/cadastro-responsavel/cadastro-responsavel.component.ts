import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { ResponsavelService } from '../services/responsavel.service';
import { Responsavel } from '../classes/Responsavel';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-cadastro-responsavel',
  templateUrl: './cadastro-responsavel.component.html',
  styleUrls: ['./cadastro-responsavel.component.css']
})
export class CadastroResponsavelComponent {

  dataNascimentoAction = new EventEmitter<string|MaterializeAction>();

  msgTitulo: string = "";
  msgCorpo: string = "";

  key: string = "";


  responsavel: Responsavel;

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

  dataNascimentoParams = [
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
  
  constructor(public router: Router, public _serviceResponsavel: ResponsavelService, public route: ActivatedRoute, public http: Http) { 

    this.responsavel = new Responsavel();

    this.route.params.subscribe(parans => {
      let key = parans['key'];
      if (key) {
        this.key = key;
          this._serviceResponsavel.getDados(key).subscribe(dados => {
            dados.forEach(element => {
              debugger;
              if (element.$key == 'cpf') {
                  this.responsavel.cpf = element.$value; 
              }
              else if (element.$key == 'email') {
                  this.responsavel.email = element.$value; 
              }
              else if (element.$key == 'nome') {
                  this.responsavel.nome = element.$value; 
              }
              else if (element.$key == 'observacao') {
                  this.responsavel.observacao = element.$value; 
              }
              else if (element.$key == 'telefone') {
                  this.responsavel.telefone = element.$value; 
              }
          });  
          });
      }
  });
  }

  gridResponsavel(){
    this.router.navigate(['gridResponsavel']);
  }

  salvar(){
    this.show('LOADING');
    if (this.key != null && this.key != "") {
      this._serviceResponsavel.alterar(this.key,this.responsavel).then(() =>{
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
     
     
      this._serviceResponsavel.isDuplicado(this.responsavel.nome).then(() => {
        this._serviceResponsavel.novo(this.responsavel).then((dados) =>{
          this.close('LOADING');

          debugger;

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
      this.gridResponsavel();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }


  
}


