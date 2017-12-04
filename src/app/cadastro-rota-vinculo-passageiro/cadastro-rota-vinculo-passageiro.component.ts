import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RotaPassageiro } from '../classes/RotaPassageiro';
import { MaterializeAction } from 'angular2-materialize';
import { AuthService } from '../services/auth.service';
import { RotaPassageiroService } from '../services/rota-passageiro.service';
import { PassageiroService } from '../services/passageiro.service';

@Component({
  selector: 'app-cadastro-rota-vinculo-passageiro',
  templateUrl: './cadastro-rota-vinculo-passageiro.component.html',
  styleUrls: ['./cadastro-rota-vinculo-passageiro.component.css']
})
export class CadastroRotaVinculoPassageiroComponent {

  passageiro: PassageiroDTO;
  rotaPassageiro: RotaPassageiro;
  listaPassageiros: Array<PassageiroDTO>;

  rotaKey: string;

  msgTitulo: string = "";
  msgCorpo: string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  dataVencimentoAction = new EventEmitter<string|MaterializeAction>();
  
  msgParams = [
    {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.8, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
    }
  ]


  constructor(public router: Router, public _serviceRotaPassageiro: RotaPassageiroService, public _serviceAuth: AuthService, public _servicePassageiro: PassageiroService, public route: ActivatedRoute) { 
    
    this._servicePassageiro.key = _serviceAuth.usuario.identificacaoCliente;
    this.listaPassageiros = new Array<PassageiroDTO>();
    this.passageiro = new PassageiroDTO;
    this.rotaPassageiro = new RotaPassageiro();


    this._servicePassageiro.lista().subscribe(dados => {
      dados.forEach(element => {
        let passN = new PassageiroDTO();
        passN.nome = element.nome;
        passN.cpf = element.cpf;
        passN.$key = element.$key;
        this.listaPassageiros.push(passN);
      });    
    });

    this.route.params.subscribe(parans => {
      this.rotaKey = parans['rotaKey'];

    });
  }

  gridRotaVincPass(){
    this.router.navigate(['gridRotaVincPass', this.rotaKey]);
  }

  salvar(){
    this.show('LOADING');  
      this._serviceRotaPassageiro.isDuplicado(this.passageiro.$key).then(() => {
        this.rotaPassageiro.passageiroKey = this.passageiro.$key;
        this._serviceRotaPassageiro.novo(this.rotaPassageiro).then((dados) =>{
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
      this.gridRotaVincPass();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }



}
class PassageiroDTO{
  public nome: string = ""; 
  public cpf: string = "";
  public $key: string = "";
}
