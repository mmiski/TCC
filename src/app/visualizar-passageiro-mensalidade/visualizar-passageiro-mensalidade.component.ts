import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { PassageiroMensalidadeService } from '../services/passageiro-mensalidade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularFire2/database';
import { PlanoMensalidadeService } from '../services/plano-mensalidade.service';
import { PassageiroMensalidade } from '../classes/PassageiroMensalidade';

@Component({
  selector: 'app-visualizar-passageiro-mensalidade',
  templateUrl: './visualizar-passageiro-mensalidade.component.html',
  styleUrls: ['./visualizar-passageiro-mensalidade.component.css']
})
export class VisualizarPassageiroMensalidadeComponent {

  listaMensalidades: Array<MensalidadeDTO>;

  msgTitulo: string = "";
  msgCorpo: string = "";
  key: string = "";
  keyExcluir: string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  mensalidadeCollapsible = new EventEmitter<string|MaterializeAction>();
  
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

  constructor(public router: Router, public route: ActivatedRoute, public _servicePassageiroMensalidade: PassageiroMensalidadeService, public _serviceAuth: AuthService, public _servicePlanoMensalidade: PlanoMensalidadeService) { 


    this.route.params.subscribe(parans => {
      let key = parans['key'];
        if (key) {

            this.key = key;
            this._servicePassageiroMensalidade.clienteKey = _serviceAuth.usuario.identificacaoCliente;
            this._servicePlanoMensalidade.key = _serviceAuth.usuario.identificacaoCliente;
            this._servicePassageiroMensalidade.passageiroKey = key;
            this.listaMensalidades = new Array<MensalidadeDTO>();

            this._servicePassageiroMensalidade.lista().subscribe(dados => {
              this.listaMensalidades = new Array<MensalidadeDTO>();
              dados.forEach(element => {
                let mensalidadeN = new MensalidadeDTO();
                mensalidadeN.mensalidadeKey = element.mensalidadeKey;
                mensalidadeN.dataVencimento = element.dataVencimento;
                mensalidadeN.diaMaxPagamento = element.diaMaxPagamento;
                mensalidadeN.janeiro = element.janeiro;
                mensalidadeN.fevereiro = element.fevereiro;
                mensalidadeN.marco = element.marco;
                mensalidadeN.abril = element.abril;
                mensalidadeN.maio = element.maio;
                mensalidadeN.junho = element.junho;
                mensalidadeN.julho = element.julho;
                mensalidadeN.agosto = element.agosto;
                mensalidadeN.setembro = element.setembro;
                mensalidadeN.outubro = element.outubro;
                mensalidadeN.novembro = element.novembro;
                mensalidadeN.dezembro = element.dezembro;
                
                mensalidadeN.$key = element.$key;

                this._servicePlanoMensalidade.getDados(mensalidadeN.mensalidadeKey).subscribe(cnt => {
                  if (cnt.length > 0) {
                    mensalidadeN.dados = cnt[0].$value;
                    mensalidadeN.titulo = cnt[1].$value;                  
                    mensalidadeN.valor = cnt[2].$value;
                    this.listaMensalidades.push(mensalidadeN);
                  }
                });

                
              });
            });
      }
    });
  }

  gridMensalidade(){
    this.router.navigate(['gridMensalidade']);
  }

  novo(){
    this.show('LOADING');
    this.router.navigate(['cadPassMensalidade', this.key]);
    this.close('LOADING');
  }

  excluir(key){
    debugger;
    this.show('LOADING');
    this.close('DANGER');
    this._servicePassageiroMensalidade.deleta(key).then(() =>{
      this.close('LOADING');
      this.msgTitulo = "Exclusão Concluída"
      this.msgCorpo = "Mensalidade foi excluido com êxito."
      this.show('SUCCESS');
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });
  }

  alterar(key:string = "", mensalidadeDTO: MensalidadeDTO){
    this.show('LOADING');
    let mensalidadeN = new PassageiroMensalidade();

    mensalidadeN.mensalidadeKey = mensalidadeDTO.mensalidadeKey;
    mensalidadeN.dataVencimento = mensalidadeDTO.dataVencimento;
    mensalidadeN.diaMaxPagamento = mensalidadeDTO.diaMaxPagamento;
    mensalidadeN.janeiro = mensalidadeDTO.janeiro;
    mensalidadeN.fevereiro = mensalidadeDTO.fevereiro;
    mensalidadeN.marco = mensalidadeDTO.marco;
    mensalidadeN.abril = mensalidadeDTO.abril;
    mensalidadeN.maio = mensalidadeDTO.maio;
    mensalidadeN.junho = mensalidadeDTO.junho;
    mensalidadeN.julho = mensalidadeDTO.julho;
    mensalidadeN.agosto = mensalidadeDTO.agosto;
    mensalidadeN.setembro = mensalidadeDTO.setembro;
    mensalidadeN.outubro = mensalidadeDTO.outubro;
    mensalidadeN.novembro = mensalidadeDTO.novembro;
    mensalidadeN.dezembro = mensalidadeDTO.dezembro;
    

    this._servicePassageiroMensalidade.alterar(key, mensalidadeN).then(() =>{
      this.close('LOADING');
      this.msgTitulo = "Mensalidade Assinado"
      this.msgCorpo = "A mensalidade foi alterada com sucesso."
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
class MensalidadeDTO{
  public $key: string = "";
  public titulo: string = "";
  public valor: string = "";
  public dados: string = "";
  public mensalidadeKey: string = "";
  public dataVencimento: string ="";
  public diaMaxPagamento: string = "";
  public janeiro: boolean = false;
  public fevereiro: boolean = false;
  public marco: boolean = false;
  public abril: boolean = false;
  public maio: boolean = false;
  public junho: boolean = false;
  public julho: boolean = false;
  public agosto: boolean = false;
  public setembro: boolean = false;
  public outubro: boolean = false;
  public novembro: boolean = false;
  public dezembro: boolean = false;
}
