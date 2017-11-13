import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { ResponsavelService } from '../services/responsavel.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularFire2/database';
import { AuthService } from '../services/auth.service';
import { Passageiro } from '../classes/Passageiro';
import { $ } from 'protractor';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-grid-responsavel',
  templateUrl: './grid-responsavel.component.html',
  styleUrls: ['./grid-responsavel.component.css']
})
export class GridResponsavelComponent{


  listaResponsaveis: FirebaseListObservable<any>;
  listaPassageiros: Array<PassageiroDTO>;
  listaSemVincPassageiros: Array<PassageiroDTO>;
  
  msgTitulo: string = "";
  msgCorpo: string = "";
  key : string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  responsavelCollapsible = new EventEmitter<string|MaterializeAction>();
  vinculoPassageiroAction = new EventEmitter<string|MaterializeAction>();
  
  msgParams = [
    {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.8, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
    }
  ]

  vinculoPassageiroParams = [
    {
      dismissible: true,
      complete: function() { console.log('Closed'); }
    }
  ]


  params = [
    {
    }
  ];


    constructor(public router: Router, public _serviceResponsavel: ResponsavelService, public _serviceAuth: AuthService, public afDataBase: AngularFireDatabase) {
      this._serviceResponsavel.key = _serviceAuth.usuario.identificacaoCliente;
      this.listaResponsaveis = this._serviceResponsavel.listaResponsaveis();
      this.listaPassageiros = new Array<PassageiroDTO>();
      this.listaSemVincPassageiros = new Array<PassageiroDTO>();
     }

     deletarPassageiro(passageiroKey: string = "", responsavelKey: string = ""){
      this.show('LOADING');
        this._serviceResponsavel.deletarPassageiro(passageiroKey, responsavelKey).then(() =>{
          this.close('LOADING');
          this.msgTitulo = "Vínculo Excluído"
          this.msgCorpo = "Passageiro desvinculado com sucesso."
          this.show('SUCCESS');
        }).catch(err => {
          this.close('LOADING');
          this.msgTitulo = "Atenção";
          this.msgCorpo = err.message;
          this.show('ALERT');
        });
     }

     carregaListaPassageiros(key: string = ""){
      this.listaPassageiros = new Array<PassageiroDTO>();
       this.afDataBase.list(`Clientes/${this._serviceAuth.usuario.identificacaoCliente}/Responsaveis/${key}/Passageiros`).subscribe(dados => {
          dados.forEach(element => {
            let passNew = new PassageiroDTO();
            passNew.$key = element.$key;
            this.afDataBase.list(`Clientes/${this._serviceAuth.usuario.identificacaoCliente}/Passageiros/${element.passageiroKey}`).subscribe(pass => {
              pass.forEach(element => {
                if (element.$key == 'cpf') {
                    passNew.cpf = element.$value; 
                }
                else if (element.$key == 'nome') {
                    passNew.nome = element.$value; 
                }
            });  
            this.listaPassageiros.push(passNew);
            })
          });
       });
     }

     carregaListaPassageirosSemVinc(keyResponsavel: string = ""){
      this.listaSemVincPassageiros = new Array<PassageiroDTO>();
      this.afDataBase.list(`Clientes/${this._serviceAuth.usuario.identificacaoCliente}/Passageiros/`).subscribe(passageiros => {
        passageiros.forEach(element => {
          this.afDataBase.list(`Clientes/${this._serviceAuth.usuario.identificacaoCliente}/Responsaveis/${keyResponsavel}/Passageiros`, {
              query: {
                orderByChild: 'passageiroKey',
                equalTo: element.$key 
              }
              }).subscribe(passResp => {
                  if (passResp.length == 0) {
                    let passNew = new PassageiroDTO();
                    passNew.$key = element.$key;
                    passNew.cpf = element.cpf;
                    passNew.nome = element.nome;
                    passNew.$keyResponsavel = keyResponsavel;
                    this.listaSemVincPassageiros.push(passNew);
                  }
              });
        });         
          this.openModalVincPassageiro();
      });
     }

     adicionarVincPassageiro(keyPassageiro:string= "", keyResponsavel: string = "", ){
      this.show('LOADING');
      this._serviceResponsavel.adicionarPassageiro(keyPassageiro, keyResponsavel).then(() => {
        this.close('LOADING');
        this.closeModalVincPassageiro();
        this.msgTitulo = "Vínculo Concluído"
        this.msgCorpo = "Passageiro vínculado com sucesso."
        this.show('SUCCESS');
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      });
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

    openModalVincPassageiro() {
      this.vinculoPassageiroAction.emit({action:"modal",params:['open']});
    }
  
    closeModalVincPassageiro() {
      this.vinculoPassageiroAction.emit({action:"modal",params:['close']});
    }


}

class PassageiroDTO{
  public nome: string = "";
  public cpf: string = "";
  public $key: string = "";
  public $keyResponsavel: string = "";
}