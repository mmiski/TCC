import { Component, OnInit, EventEmitter } from '@angular/core';
import { FirebaseListObservable } from 'angularFire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { AcessoMobileService } from '../services/acesso-mobile.service';
import { AuthService } from '../services/auth.service';
import { ResponsavelService } from '../services/responsavel.service';
import { PassageiroService } from '../services/passageiro.service';
import { MotoristaService } from '../services/motorista.service';
@Component({
  selector: 'app-lista-acessos',
  templateUrl: './lista-acessos.component.html',
  styleUrls: ['./lista-acessos.component.css']
})
export class ListaAcessosComponent {


  listaGrid: Array<ListaGridDTO>;
  listaCadastro: FirebaseListObservable<any>;
  tipoUsuario: number;
  key: string;
  
  msgTitulo: string = "";
  msgCorpo: string = "";

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();
  usuarioCollapsible = new EventEmitter<string|MaterializeAction>();
  vinculoUsuarioAction = new EventEmitter<string|MaterializeAction>();
  
  msgParams = [
    {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.8, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
    }
  ]

  vinculoUsuarioParams = [
    {
      dismissible: true,
      complete: function() { console.log('Closed'); }
    }
  ]


  params = [
    {
    }
  ];


    constructor(public router: Router,public route: ActivatedRoute, public _serviceAcesso : AcessoMobileService, public _serviceAuth: AuthService, public _serviceResponsavel: ResponsavelService,
                public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService) {

                  
                  
      this._serviceAcesso.clienteKey = this._serviceAuth.usuario.identificacaoCliente;
      this._serviceMotorista.key = this._serviceAuth.usuario.identificacaoCliente;
      this._servicePassageiro.key = this._serviceAuth.usuario.identificacaoCliente;
      this._serviceResponsavel.key = this._serviceAuth.usuario.identificacaoCliente;

      this.route.params.subscribe(parans => {
        this.tipoUsuario = parans['tipoUsuario'];        
        
        this.listaCadastro = this.tipoUsuario == 0 ? this._servicePassageiro.lista() : this.tipoUsuario == 1 ? this._serviceMotorista.lista() : this._serviceResponsavel.listaResponsaveis();

          this._serviceAcesso.lista().subscribe(dados => {
            dados.forEach(element => {
              if (element.tipoUsuario == this.tipoUsuario) {
              let listaGridNew = new ListaGridDTO();
                debugger;
              listaGridNew.$key = element.$key;
              listaGridNew.$keyUsuario = element.usuarioKey;
              listaGridNew.codigo = element.codigo;
              listaGridNew.ultimoAcesso = element.ultimoAcesso;
              listaGridNew.dispositivoUltimoAcesso = element.dispositivoUltimoAcesso;
            
                if (this.tipoUsuario == 1) {
                  this._servicePassageiro.getDados(element.usuarioKey).subscribe(pass => {
                    pass.forEach(element => {
                      debugger;
                      if (element.$key == 'nome') {
                        listaGridNew.nome = element.$value; 
                      }
                      if (element.$key == 'cpf') {
                        listaGridNew.cpf = element.$value; 
                      }
                    });      
                    
                    this.listaGrid.push(listaGridNew);
                  });
                } else if (this.tipoUsuario == 2) {
                  this._serviceMotorista.getDados(element.usuarioKey).subscribe(pass => {
                    pass.forEach(element => {
                      debugger;
                      if (element.$key == 'nome') {
                        listaGridNew.nome = element.$value; 
                      }
                      if (element.$key == 'cpf') {
                        listaGridNew.cpf = element.$value; 
                      }
                    }); 
                    this.listaGrid.push(listaGridNew);                  
                  });
                }else if (this.tipoUsuario == 3) {
                  this._serviceResponsavel.getDados(element.usuarioKey).subscribe(pass => {
                    pass.forEach(element => {
                      debugger;
                      if (element.$key == 'nome') {
                        listaGridNew.nome = element.$value; 
                      }
                      if (element.$key == 'cpf') {
                        listaGridNew.cpf = element.$value; 
                      }
                    });   
                    this.listaGrid.push(listaGridNew);                
                  });
                }
              }
            });
          })
      });
     }


     gridAcessoMobile(){
      this.router.navigate(['gridAcessoMobile']);
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
      }
      else if(tipo.toUpperCase() == "LOADING"){
        this.loading.emit({action:"modal",params:['close']});
      }
    }

    novo(){
      this.openModalVincUs();
    }

    openModalVincUs() {
      this.vinculoUsuarioAction.emit({action:"modal",params:['open']});
    }
  
    closeModalVincPassageiro() {
      this.vinculoUsuarioAction.emit({action:"modal",params:['close']});
    }

}

class ListaGridDTO{
  public nome: string = "";
  public cpf: string = "";
  public $keyUsuario: string = "";
  public $key: string= "";
  public ultimoAcesso: string = "";
  public codigo: string = "";
  public dispositivoUltimoAcesso: string = "";
}

