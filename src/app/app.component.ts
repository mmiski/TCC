import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize/dist";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularFire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { AuthService } from "./services/auth.service";
import { Usuario } from './classes/Usuario';
import { UsuarioMensagem } from './classes/UsuarioMensagem';
import { UsuarioMensagemService } from './services/usuario-mensagem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  // Ações dos componentes do materialize
modalLogin = new EventEmitter<string|MaterializeAction>();
navBarLateralCollapsible = new EventEmitter<string|MaterializeAction>();
navBarLogin = new EventEmitter<string|MaterializeAction>();
cadastroLogin= new EventEmitter<string|MaterializeAction>();
usuarioMensagemAction = new EventEmitter<string|MaterializeAction>();
alert = new EventEmitter<string|MaterializeAction>();
success = new EventEmitter<string|MaterializeAction>();
danger = new EventEmitter<string|MaterializeAction>();  
loading = new EventEmitter<string|MaterializeAction>();


//Login
emailLogin: string = "";
senhaLogin: string = "";

//cadastro Login
emailLoginCad: string = "";
senhaLoginCad: string = "";
nomeLoginCad: string = "";

//Titulo da navbar
titulo: string = "";

//controle
logado: boolean = false;
usuario: Usuario;
usuarioMensagem: UsuarioMensagem;
logo: string;

//Mensagem
msgTitulo: string = "";
msgCorpo: string = "";

//Inicio dos parametros dos compoentes materialize

navBarLoginParams = [
  {
    menuWidth: '100vw', 
    edge: 'right',
    closeOnClick: false, 
    draggable: true
  }
]

modalLoginParams = [
  {
    dismissible: true,
    complete: () => {
      this.usuarioMensagem = new UsuarioMensagem();
    }
  }
]

usuarioMensagemparams = [
  {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.8, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    complete: () => {
      this.usuarioMensagem = new UsuarioMensagem();
    }
  }
]

selectTipos = [
  {value:1,name:"Ajuda"},
  {value:2,name:"Erro"}
]

params = [
  {
    onOpen: (el) => {
      console.log("Collapsible open", el);
    },
    onClose: (el) => {
      console.log("Collapsible close", el);
    }
  }
];

msgParams = [
  {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.8, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
  }
]
//fim dos parametros


//Método construtor
constructor(public router: Router, public  _service: AuthService, public _serviceUsuarioMensagem: UsuarioMensagemService){
  this.usuarioMensagem = new UsuarioMensagem();
  this.router.navigate(['site']);

  // //Pra não precisar ficar logando
  this.emailLogin = "1@1.com";
  this.senhaLogin = "111111";
  this.loginEmailSenha();
}


//Inicio dos métodos
  openModaUsuarioMensagem() {
    this.usuarioMensagem.email = this.usuario.email;
    this.usuarioMensagemAction.emit({action:"modal",params:['open']});
  }
  closeModaUsuarioMensagem() {
    this.usuarioMensagem = new UsuarioMensagem();
  this.usuarioMensagemAction.emit({action:"modal",params:['close']});
  }

  openModalLogin() {
      this.modalLogin.emit({action:"modal",params:['open']});
  }
  closeModalLogin() {
    this.modalLogin.emit({action:"modal",params:['close']});
  }

  openNavBarLogin(){
    this.navBarLogin.emit({action:"sideNav",params:['show']});
  }

  closeNavBarLogin(){
    this.navBarLogin.emit({action:"sideNav",params:['hide']});
  }

  setTitulo(titulo: string = ""){
    this.titulo = titulo;
  }

  enviar(){
    this.show('LOADING');
    this.usuarioMensagem.nome = this.usuario.nome;
    this.usuarioMensagem.userDbId = this.usuario.keyDuplicadoUsuario;
    this.usuarioMensagem.userId = this.usuario.uid;
    this._serviceUsuarioMensagem.enviar(this.usuarioMensagem).then(() => {
      this.close('LOADING');
      this.msgTitulo = "Mensagem Enviada";
      this.msgCorpo = "Não se preocupe, nossa equipe recebeu e logo entrará em contato!";
      this.closeModaUsuarioMensagem();
      this.show('SUCCESS');
    }).catch(err => {
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
      this.close('LOADING');
    });
  }

  loginEmailSenha(){
    this.show('LOADING');
    this._service.loginEmailSenha(this.emailLogin, this.senhaLogin).then(() => { 
      this.closeModalLogin();
      this.router.navigate(['main']);     
      this.setTitulo('');
      this.setLogado(true);
      this.usuario = this._service.getDadosUsuarioDataBase(0);
      this.usuarioMensagem = new UsuarioMensagem();
      this.closeNavBarLogin();
      this.close('LOADING');
    }).catch(err => {
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
      this.close('LOADING');
    });
  }

  loginProvider(tipo: number){
    let provider = tipo == 1 ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider();
    this._service.afAuth.auth.signInWithPopup(provider).then(() => {
      this.show('LOADING');
      this.closeModalLogin();
      this.router.navigate(['main']); 
      this.setTitulo('');
      this.setLogado(true);
      this.usuario = this._service.getDadosUsuarioDataBase(1);
      this.usuarioMensagem = new UsuarioMensagem();
      this.closeNavBarLogin();
      this.close('LOADING');
    }).catch(err => {
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
      this.close('LOADING');
    });
  }

  cadastraUsuario(){
    this.show('LOADING');
    this._service.cadastroUsuarioEmailSenha(this.emailLogin, this.senhaLogin, this.nomeLoginCad).then(() => {   
      this.close('LOADING');
      this.loginEmailSenha();
    }).catch(err => {
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
      this.close('LOADING');
    });
  }

  logOut(){
    this.show('LOADING');
    this._service.logout().then(()=>{
      this.setLogado(false);
      this.router.navigate(['site']); 
      this.close('LOADING');
    }).catch(err => {
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
      this.close('LOADING');
    });
  }

  setLogado(situacao: boolean){
    this.logado = situacao;
    this.limpaCamposLogin();
    debugger;
  }

  limpaCamposLogin(){
    this.emailLogin = "";
    this.senhaLogin = "";
    this.emailLoginCad = "";
    this.senhaLoginCad = "";
    this.nomeLoginCad = "";
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
//fim dos parametros
}