import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { PassageiroService } from '../services/passageiro.service';
import { Passageiro } from '../classes/Passageiro';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-cadastro-passageiro',
  templateUrl: './cadastro-passageiro.component.html',
  styleUrls: ['./cadastro-passageiro.component.css']
})
export class CadastroPassageiroComponent {

  dataNascimentoAction = new EventEmitter<string|MaterializeAction>();

  msgTitulo: string = "";
  msgCorpo: string = "";

  key: string = "";
  keyPosicao: string= "";


  passageiro: Passageiro;
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
  
  constructor(public router: Router, public _servicePassageiro: PassageiroService, public route: ActivatedRoute, public http: Http) { 

    this.passageiro = new Passageiro();

    this.route.params.subscribe(parans => {
      let key = parans['key'];
      if (key) {
        this.key = key;
        this.zoom = 18;
          this._servicePassageiro.getDados(key).subscribe(dados => {
            this.passageiro.cpf = dados[0].$value;
            this.passageiro.dataNascimento = dados[1].$value;       
            this.passageiro.descricaoPosicao = dados[2].$value;   
            this.passageiro.email = dados[3].$value;
            this.passageiro.endereco = dados[4].$value;
            this.passageiro.latitude = parseFloat(dados[5].$value);
            this.passageiro.longitude =  parseFloat(dados[6].$value);
            this.passageiro.nome = dados[7].$value;
            this.passageiro.telefone = dados[8].$value;
          });
      }
  });
  }

  gridPassageiro(){
    this.router.navigate(['gridPassageiro']);
  }

  atualizaEndereco(evento: any){
    debugger;
    this.passageiro.latitude = evento.coords.lat;
    this.passageiro.longitude = evento.coords.lng;

    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${evento.coords.lat},${evento.coords.lng}&key=AIzaSyAvOdpKx_WqECI5MBuE3UaHE63t-Ik3a3A`)
    .map(res => res.json())
    .subscribe(dados => {
      this.passageiro.endereco = dados.results[0].formatted_address;
    }, err => {
      debugger;
      this.msgTitulo = "Atenção";
      this.msgCorpo = "Ocorreu um erro ao atualizar o endereço!";
      this.show('ALERT');
    });

  }

  salvar(){
    this.show('LOADING');
    if (this.key != null && this.key != "") {
      this._servicePassageiro.alterar(this.key,this.passageiro).then(() =>{
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
     
     
      this._servicePassageiro.isDuplicado(this.passageiro.nome).then(() => {
        this._servicePassageiro.novo(this.passageiro).then((dados) =>{
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
      this.gridPassageiro();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }


  
}


