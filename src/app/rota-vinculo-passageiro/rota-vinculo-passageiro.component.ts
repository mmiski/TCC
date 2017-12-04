import { Component,EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router, ActivatedRoute } from '@angular/router';
import { RotaPassageiroService } from '../services/rota-passageiro.service';
import { AuthService } from '../services/auth.service';
import { PassageiroService } from '../services/passageiro.service';
import { RotaPassageiro } from '../classes/RotaPassageiro';

@Component({
  selector: 'app-rota-vinculo-passageiro',
  templateUrl: './rota-vinculo-passageiro.component.html',
  styleUrls: ['./rota-vinculo-passageiro.component.css']
})
export class RotaVinculoPassageiroComponent {

  listaRotaPassageiros: Array<RotaPassageiroDTO>;
  
    msgTitulo: string = "";
    msgCorpo: string = "";
    rotaKey: string = "";
    keyExcluir: string = "";
  
    alert = new EventEmitter<string|MaterializeAction>();
    success = new EventEmitter<string|MaterializeAction>();
    danger = new EventEmitter<string|MaterializeAction>();  
    loading = new EventEmitter<string|MaterializeAction>();
    rotaPassageirosCollapsible = new EventEmitter<string|MaterializeAction>();
    
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
  
    constructor(public router: Router, public route: ActivatedRoute, public _serviceRotaPassageiro: RotaPassageiroService, public _serviceAuth: AuthService, public _servicePassageiro: PassageiroService) { 
  
  
      this.route.params.subscribe(parans => {
        this.rotaKey = parans['rotaKey'];
          if (this.rotaKey ) {
              this._serviceRotaPassageiro.clienteKey = _serviceAuth.usuario.identificacaoCliente;
              this._serviceRotaPassageiro.rotaKey = this.rotaKey; 
              this._servicePassageiro.key = _serviceAuth.usuario.identificacaoCliente;
              this.listaRotaPassageiros = new Array<RotaPassageiroDTO>();
  
              this._serviceRotaPassageiro.lista().subscribe(dados => {
                this.listaRotaPassageiros = new Array<RotaPassageiroDTO>();
                dados.forEach(element => {
                  let rpN = new RotaPassageiroDTO();
                  rpN.$keyPassageiro = element.passageiroKey;
                  rpN.ordem = element.ordem;
                  rpN.segunda = element.segunda;
                  rpN.terca = element.terca;
                  rpN.quarta = element.quarta;
                  rpN.quinta = element.quinta;
                  rpN.sexta = element.sexta;
                  rpN.sabado = element.sabado;
                  rpN.domingo = element.domingo;
                  
                  rpN.$keyRotaPassageiro = element.$key;
  
                  this._servicePassageiro.getDados(rpN.$keyPassageiro).subscribe(cnt => {
                    if (cnt.length > 0) {
                      cnt.forEach(pass => {
                        if (pass.$key == 'cpf') {
                          rpN.cpf = pass.$value; 
                        }else if (pass.$key == 'nome') {
                          rpN.nome = pass.$value;  
                        }                       
                      });
                          
                      this.listaRotaPassageiros.push(rpN);
                    }
                  });
  
                  
                });
              });
        }
      });
    }
  
    gridRota(){
      this.router.navigate(['gridRota']);
    }

    rotaMapa(){
      this.router.navigate(['rotaMapa', this.rotaKey]);
    }

    novo(){
      this.router.navigate(['cadRotaVincPass', this.rotaKey]);
    }
  
    excluir(key){
      debugger;
      this.show('LOADING');
      this.close('DANGER');
      this._serviceRotaPassageiro.deleta(key).then(() =>{
        this.close('LOADING');
        this.msgTitulo = "Exclusão Concluída"
        this.msgCorpo = "Passageiro foi excluido com êxito."
        this.show('SUCCESS');
      }).catch(err => {
        this.close('LOADING');
        this.msgTitulo = "Atenção";
        this.msgCorpo = err.message;
        this.show('ALERT');
      });
    }
  
    alterar(key:string = "", rotaPassageiroDTO: RotaPassageiroDTO){
      this.show('LOADING');
      let rpN = new RotaPassageiro();
  
      rpN.passageiroKey = rotaPassageiroDTO.$keyPassageiro;
      rpN.ordem = rotaPassageiroDTO.ordem;
      rpN.segunda = rotaPassageiroDTO.segunda;
      rpN.terca = rotaPassageiroDTO.terca;
      rpN.quarta = rotaPassageiroDTO.quarta;
      rpN.quinta = rotaPassageiroDTO.quinta;
      rpN.sexta = rotaPassageiroDTO.sexta;
      rpN.sabado = rotaPassageiroDTO.sabado;
      rpN.domingo = rotaPassageiroDTO.domingo;
      
  
      this._serviceRotaPassageiro.alterar(key, rpN).then(() =>{
        this.close('LOADING');
        this.msgTitulo = "Dados Atualizados"
        this.msgCorpo = "Os dados do passageiro para a rota foram atualizados com sucesso."
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
  class RotaPassageiroDTO{
    public $keyPassageiro: string = "";
    public $keyRotaPassageiro: string = "";
    public ordem: number = 0;
    public nome: string = "";
    public cpf: string = "";
    public segunda: boolean = false;
    public terca: boolean = false;
    public quarta: boolean = false;
    public quinta: boolean = false;
    public sexta: boolean = false;
    public sabado: boolean = false;
    public domingo: boolean = false;
  }
