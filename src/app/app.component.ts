import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from "angular2-materialize/dist";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularFire2/database";
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { AuthService } from "./services/auth.service";
import { Usuario } from './classes/Usuario';
import { Contato } from './classes/Contato';
import { ContatoService } from './services/contato.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Ações dos componentes do materialize
modalLogin = new EventEmitter<string|MaterializeAction>();
navBarLateralCollapsible = new EventEmitter<string|MaterializeAction>();
navBarLogin = new EventEmitter<string|MaterializeAction>();
cadastroLogin= new EventEmitter<string|MaterializeAction>();
modalContato = new EventEmitter<string|MaterializeAction>();


//Login
emailLogin: string = "";
senhaLogin: string = "";

//Titulo da navbar
titulo: string = "";

//controle
logado: boolean = false;
usuario: Usuario;
contato: Contato;
logo: string;

//Inicio dos parametros dos compoentes materialize

navBarLoginParams = [
  {
    menuWidth: '100vw', 
    edge: 'right',
    closeOnClick: false, 
    draggable: true
  }
]

modelContatoParams = [
  {
    dismissible: true,
    complete: function() { console.log('Closed'); }
  }
]

modalLoginParams = [
  {
    dismissible: true,
    complete: () => {
      this.contato = new Contato();
    }
  }
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
//fim dos parametros


//Método construtor
constructor(public router: Router, public  _service: AuthService, public _serviceContato: ContatoService){

 console.log(this._service.afAuth.auth.currentUser)
  this.router.navigate(['site']); 
  this.contato = new Contato();

  //Pra não precisar ficar logando
  this.emailLogin = "1@1.com";
  this.senhaLogin = "111111";
  this.loginEmailSenha();
}


//Inicio dos métodos
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

  loginEmailSenha(){
    this._service.loginEmailSenha(this.emailLogin, this.senhaLogin).then(() => {
      this.closeModalLogin();
      this.router.navigate(['main']); 
      this.setTitulo('');
      this.setLogado(true);
      this.usuario = this._service.getDadosUsuarioDataBase(0);
      this.closeNavBarLogin();
    });
  }

  loginProvider(tipo: number){
    let provider = tipo == 1 ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider();
    this._service.afAuth.auth.signInWithPopup(provider).then(() => {
      this.closeModalLogin();
      this.router.navigate(['main']); 
      this.setTitulo('');
      this.setLogado(true);
      this.usuario = this._service.getDadosUsuarioDataBase(1);
      this.closeNavBarLogin();
    });
  }

  cadastraUsuario(){
    this._service.cadastroUsuarioEmailSenha(this.emailLogin, this.senhaLogin).then(() => {   
      this.loginEmailSenha();
    });
  }

  logOut(){
    this._service.logout().then(()=>{
      this.setLogado(false);
      this.router.navigate(['site']); 
    });
  }

  setLogado(situacao: boolean){
    this.logado = situacao;
    debugger;
    console.log(this._service.afAuth.auth.currentUser)
  }

  openModalContato() {
    this.modalContato.emit({action:"modal",params:['open']});
  }

  closeModalContato() {
    this.modalContato.emit({action:"modal",params:['close']});
  }

  enviar(){
    this._serviceContato.enviar(this.contato).then(() => {
      this.closeModalContato();
    });
  }
//fim dos parametros
}
