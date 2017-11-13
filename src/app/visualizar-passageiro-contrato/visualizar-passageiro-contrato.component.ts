import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { PassageiroContratoService } from '../services/passageiro-contrato.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularFire2/database';
import { ModeloContratoService } from '../services/modelo-contrato.service';

@Component({
  selector: 'app-visualizar-passageiro-contrato',
  templateUrl: './visualizar-passageiro-contrato.component.html',
  styleUrls: ['./visualizar-passageiro-contrato.component.css']
})
export class VisualizarPassageiroContratoComponent {

  listaContratos: Array<ContratoDTO>;

  msgTitulo: string = "";
  msgCorpo: string = "";
  key: string = "";
  keyExcluir: string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  contratoCollapsible = new EventEmitter<string|MaterializeAction>();
  
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
    }
  ];

  constructor(public router: Router, public route: ActivatedRoute, public _servicePassageiroContrato: PassageiroContratoService, public _serviceAuth: AuthService, public _serviceModeloContrato: ModeloContratoService) { 


    this.route.params.subscribe(parans => {
      let key = parans['key'];
        if (key) {

            this.key = key;
            this._servicePassageiroContrato.clienteKey = _serviceAuth.usuario.identificacaoCliente;
            this._serviceModeloContrato.key = _serviceAuth.usuario.identificacaoCliente;
            this._servicePassageiroContrato.passageiroKey = key;
            this.listaContratos = new Array<ContratoDTO>();

            this._servicePassageiroContrato.lista().subscribe(dados => {
              this.listaContratos = new Array<ContratoDTO>();
              dados.forEach(element => {
                let contratoN = new ContratoDTO();
                contratoN.assinado = element.assinado;
                contratoN.dataVencimento = element.dataVencimento;
                contratoN.contratoKey = element.contratoKey;
                contratoN.$key = element.$key;

                this._serviceModeloContrato.getDados(contratoN.contratoKey).subscribe(cnt => {
                  if (cnt.length > 0) {
                    contratoN.titulo = cnt[1].$value;
                    contratoN.dados = cnt[0].$value;
                    this.listaContratos.push(contratoN);
                  }
                });

                
              });
            });
      }
    });
  }

  gridContrato(){
    this.router.navigate(['gridContrato']);
  }

  novo(){
    this.show('LOADING');
    this.router.navigate(['cadPassContrato', this.key]);
    this.close('LOADING');
  }

  excluir(key){
    debugger;
    this.show('LOADING');
    this.close('DANGER');
    this._servicePassageiroContrato.deleta(key).then(() =>{
      this.close('LOADING');
      this.msgTitulo = "Exclusão Concluída"
      this.msgCorpo = "Contrato foi excluido com êxito."
      this.show('SUCCESS');
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });
  }

  assinar(assinado: boolean = false, key:string = ""){
    this.show('LOADING');
    this._servicePassageiroContrato.assinar(assinado, key).then(() =>{
      this.close('LOADING');
      this.msgTitulo = "Contrato Assinado"
      this.msgCorpo = "O contrato foi assinado com sucesso."
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
            this.danger.emit({action:"modal",params:['open']});
            this.keyExcluir = key;
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
class ContratoDTO{
  public titulo: string = "";
  public dados: string = "";
  public contratoKey: string = "";
  public dataVencimento: string ="";
  public assinado: boolean = false;
  public $key: string= "";
}
