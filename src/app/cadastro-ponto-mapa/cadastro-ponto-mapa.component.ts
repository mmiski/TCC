import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseListObservable } from 'angularFire2/database';
import { Posicao } from '../classes/Posicao';
import { MaterializeAction } from 'angular2-materialize';
import { RotaService } from '../services/rota.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro-ponto-mapa',
  templateUrl: './cadastro-ponto-mapa.component.html',
  styleUrls: ['./cadastro-ponto-mapa.component.css']
})
export class CadastroPontoMapaComponent{

  listaPontos: FirebaseListObservable<any>;
  
    msgTitulo: string = "";
    msgCorpo: string = "";
  
    keyRota: string = "";
    keyPosicao: string= "";
    key: string = "";
  
    zoom: number = 14;
  
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
    
    constructor(public router: Router, public _serviceRota: RotaService, public route: ActivatedRoute, public _serviceAuth: AuthService) { 
  
      this._serviceRota.key = this._serviceAuth.usuario.identificacaoCliente;

      this.route.params.subscribe(parans => {
        this.keyRota = parans['rotaKey'];
        if (this.keyRota) {
            this.listaPontos = this._serviceRota.listaPontosMapa(this.keyRota);
        }
    });
    }
  
    gridRotas(){
      this.router.navigate(['gridRota']);
    }
  
    alteraPonto(posicao: any){
      this.show('LOADING');
      let posNew = new Posicao();
      posNew.latitude = posicao.latitude;
      posNew.longitude = posicao.longitude;
      posNew.descricao = posicao.descricao;
        this._serviceRota.alterarPonto(posicao.$key, this.keyRota,posNew).then(() =>{
          this.close('LOADING');
        }).catch(err => {
          this.close('LOADING');
          this.msgTitulo = "Atenção";
          this.msgCorpo = err.message;
          this.show('ALERT');
        });
    }

    alteraMov(evento: any, posicao: any){
      this.show('LOADING');
      let posNew = new Posicao();
      posNew.latitude = evento.coords.lat;
      posNew.longitude = evento.coords.lng;
      posNew.descricao = posicao.descricao;
        this._serviceRota.alterarPonto(posicao.$key, this.keyRota,posNew).then(() =>{
          this.close('LOADING');
        }).catch(err => {
          this.close('LOADING');
          this.msgTitulo = "Atenção";
          this.msgCorpo = err.message;
          this.show('ALERT');
        });
    }
  
    adicionarPonto(evento : any){
      this.show('LOADING');
      let posicao = new Posicao();
      posicao.latitude = evento.coords.lat;
      posicao.longitude = evento.coords.lng;
        this._serviceRota.adicionarPonto(this.keyRota, posicao).then(() =>{
          this.close('LOADING');
        }).catch(err => {
          this.close('LOADING');
          this.msgTitulo = "Atenção";
          this.msgCorpo = err.message;
          this.show('ALERT');
        });
    }
  
    excluir(key: string){
      this.show('LOADING');
      this.close('DANGER');
      this._serviceRota.deletarPonto(key).then(() =>{
       this.close('LOADING');
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
        this.gridRotas();
      }
      else if(tipo.toUpperCase() == "LOADING"){
        this.loading.emit({action:"modal",params:['close']});
      }
    }
  



}
