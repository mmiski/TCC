import { Component, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Veiculo } from '../classes/Veiculo';
import { MaterializeAction } from 'angular2-materialize';
import { VeiculoService } from '../services/veiculo.service';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.css']
})
export class CadastroVeiculoComponent{

 
  msgTitulo: string = "";
  msgCorpo: string = "";

  key: string = "";

  veiculo: Veiculo;
 

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
  
  constructor(public router: Router, public _serviceVeiculo: VeiculoService, public route: ActivatedRoute) { 

    this.veiculo = new Veiculo();

    this.route.params.subscribe(parans => {
      let key = parans['key'];
      if (key) {
        this.key = key;
          this._serviceVeiculo.getDados(key).subscribe(dados => {
            this.veiculo.ano = dados[0].$value;
            this.veiculo.fabricante = dados[1].$value;          
            this.veiculo.modelo = dados[2].$value;
            this.veiculo.placa = dados[3].$value;
            this.veiculo.renavam = dados[4].$value;
          });
      }
  });
  }

  gridVeiculo(){
    this.router.navigate(['gridVeiculo']);
  }


  salvar(){
    this.show('LOADING');
    if (this.key != null && this.key != "") {
      this._serviceVeiculo.alterar(this.key,this.veiculo).then(() =>{
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
     
      this._serviceVeiculo.isDuplicado(this.veiculo.placa).then(() => {
        this._serviceVeiculo.novo(this.veiculo).then(() =>{
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
      this.gridVeiculo();
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }


}
