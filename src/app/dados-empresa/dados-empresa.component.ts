import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../classes/Cliente';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../classes/Usuario';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-dados-empresa',
  templateUrl: './dados-empresa.component.html',
  styleUrls: ['./dados-empresa.component.css']
})
export class DadosEmpresaComponent  {

cliente: Cliente;
usuario: Usuario;
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

msgTitulo: string = "";
msgCorpo: string = "";

  constructor(public _serviceCliente: ClienteService, public _serviceAuth: AuthService) { 
    this.usuario = this._serviceAuth.usuario;
    this.cliente = this._serviceAuth.getDadosClienteDataBase();
  } 

  salvar(){
    this.show('LOADING');
    this._serviceCliente.salvaCliente(this.cliente,this.usuario.identificacaoCliente).then(() => {
      this.close('LOADING');
    this.msgTitulo = "Cadastro Salvo";
    this.msgCorpo = "Os dados da Empresa foram salvos com sucesso!";
    this.show('SUCCESS');
    }).catch(err =>{
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('DANGER');
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
  }
  else if(tipo.toUpperCase() == "LOADING"){
    this.loading.emit({action:"modal",params:['close']});
  }
}

}
