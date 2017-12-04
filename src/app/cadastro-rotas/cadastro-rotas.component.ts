import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Rota } from '../classes/Rota';
import { RotaService } from '../services/rota.service';

@Component({
  selector: 'app-cadastro-rotas',
  templateUrl: './cadastro-rotas.component.html',
  styleUrls: ['./cadastro-rotas.component.css']
})
export class CadastroRotasComponent{

  horarioInicio = new EventEmitter<string|MaterializeAction>();
  horarioTermino = new EventEmitter<string|MaterializeAction>();

  selectOptions = [
    {value:1,name:"DE"},
    {value:2,name:"PARA"}
  ]
  
    msgTitulo: string = "";
    msgCorpo: string = "";
  
    key: string = "";
    keyPosicao: string= "";
  
  
    rota: Rota;
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

    timePickerParams = [
      {
        default: 'now',
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Limpar', // text for clear-button
        canceltext: 'Cancelar', // Text for cancel-button
      }
    ]
  
    
    constructor(public router: Router, public _serviceRota: RotaService, public route: ActivatedRoute) { 
  
      this.rota = new Rota();
  
      this.route.params.subscribe(parans => {
        let key = parans['key'];
        if (key) {
          this.key = key;
          this.zoom = 18;
            this._serviceRota.getDados(key).subscribe(dados => {
              dados.forEach(pass => {
                if (pass.$key == 'descricao') {
                  this.rota.descricao = pass.$value; 
                }
                else if (pass.$key == 'horaInicio') {
                  this.rota.horaInicio = pass.$value; 
                }
                else if (pass.$key == 'horaTermino') {
                  this.rota.horaTermino = pass.$value; 
                }
              });
            });
        }
    });
    }
  
    gridRotas(){
      this.router.navigate(['gridRota']);
    }
  
    salvar(){
      this.show('LOADING');
      if (this.key != null && this.key != "") {
        this._serviceRota.alterar(this.key,this.rota).then(() =>{
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
       
       
        this._serviceRota.isDuplicado(this.rota.descricao).then(() => {
          this._serviceRota.novo(this.rota).then((dados) =>{
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
        this.gridRotas();
      }
      else if(tipo.toUpperCase() == "LOADING"){
        this.loading.emit({action:"modal",params:['close']});
      }
    }
  
  
}
