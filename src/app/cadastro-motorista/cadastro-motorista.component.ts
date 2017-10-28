import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Motorista } from '../classes/Motorista';
import { MotoristaService } from '../services/motorista.service';

@Component({
  selector: 'app-cadastro-motorista',
  templateUrl: './cadastro-motorista.component.html',
  styleUrls: ['./cadastro-motorista.component.css']
})
export class CadastroMotoristaComponent {

dataEmissaoAction = new EventEmitter<string|MaterializeAction>();
dataVencimentoAction = new EventEmitter<string|MaterializeAction>();
dataNascimentoAction = new EventEmitter<string|MaterializeAction>();


msgTitulo: string = "";
msgCorpo: string = "";

key: string = "";

motorista: Motorista;


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

dataEmissaoParams = [
  {
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true, // Close upon selecting a date,
    format: 'dd/mm/yyyy'
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

constructor(public router: Router, public _serviceMotorista: MotoristaService, public route: ActivatedRoute) { 

  this.motorista = new Motorista();

  this.route.params.subscribe(parans => {
    let key = parans['key'];
    if (key) {
      this.key = key;
        this._serviceMotorista.getDados(key).subscribe(dados => {
          this.motorista.cpf = dados[0].$value;
          this.motorista.dataEmissao = dados[1].$value;
          this.motorista.dataNascimento = dados[2].$value;
          this.motorista.dataVencimento = dados[3].$value;
          this.motorista.nome = dados[4].$value;
          this.motorista.nRegistro = dados[5].$value;
          this.motorista.telefone = dados[6].$value;
        });
    }
});
}

gridMotorista(){
  this.router.navigate(['gridMotorista']);
}


salvar(){
  this.show('LOADING');
  if (this.key != null && this.key != "") {
    this._serviceMotorista.alterar(this.key,this.motorista).then(() =>{
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
    debugger;
   
    this._serviceMotorista.isDuplicado(this.motorista.cpf).then(() => {
      this._serviceMotorista.novo(this.motorista).then(() =>{
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
    this.gridMotorista();
  }
  else if(tipo.toUpperCase() == "LOADING"){
    this.loading.emit({action:"modal",params:['close']});
  }
}


  


}
