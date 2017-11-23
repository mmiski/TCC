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
import { FormGroup, FormControl,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {


  formularioLogin: FormGroup;
  formularioCadastroLogin: FormGroup;


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
     
    },
    onClose: (el) => {
      
    },
    closeOnClick: true
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
constructor(private formBuilder: FormBuilder, public router: Router, public  _service: AuthService, public _serviceUsuarioMensagem: UsuarioMensagemService){
  this.usuarioMensagem = new UsuarioMensagem();
  this.router.navigate(['site']);
  this.usuario = new Usuario();

}

ngOnInit(){
  this.formularioLogin = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    senha: [null, Validators.required]
  });

  this.formularioCadastroLogin= this.formBuilder.group({
    nome: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    senha: [null, Validators.required]
  });
}
//Inicio dos métodos


verificaValidTouched(campo: string, formulario: FormGroup) {
  return (
    !formulario.get(campo).valid &&
    (formulario.get(campo).touched || formulario.get(campo).dirty)
  );
}

verificaEmailInvalido(formulario: FormGroup) {
  const campoEmail = formulario.get('email');
  if (campoEmail.errors) {
    return campoEmail.errors['email'] && campoEmail.touched;
  }
}


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
    this.limpaCamposLogin();
  }

  openNavBarLogin(){
    this.navBarLogin.emit({action:"sideNav",params:['show']});
  }

  closeNavBarLogin(){
    this.navBarLogin.emit({action:"sideNav",params:['hide']});
    this.limpaCamposLogin();
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

  loginEmailSenha(isCadastro: boolean = false){
    this.show('LOADING');
    let email = isCadastro ? this.formularioCadastroLogin.get('email').value : this.formularioLogin.get('email').value;
    let senha = isCadastro ? this.formularioCadastroLogin.get('senha').value : this.formularioLogin.get('senha').value;
    this._service.loginEmailSenha(email,senha).then(() => { 
      this.closeModalLogin();
      this.router.navigate(['main']);     
      this.setTitulo('');
      this.setLogado(true);
      this.usuario = this._service.usuario;
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
    
    this._service.signInWithPopup(tipo).then(() => {
      this.show('LOADING');
      this.closeModalLogin();
      this.router.navigate(['main']); 
      this.setTitulo('');
      this.setLogado(true);
      this.usuario = this._service.usuario;
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
    this._service.cadastroUsuarioEmailSenha(this.formularioCadastroLogin.get('email').value, 
                                            this.formularioCadastroLogin.get('senha').value, 
                                            this.formularioCadastroLogin.get('nome').value).then(() => {   
      this.close('LOADING');
      this.loginEmailSenha(true);
    }).catch(err => {
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
      this.close('LOADING');
    });
  }

  esqueciMinhaSenha(){
    this.show('LOADING');
    this._service.redefinirSenha(this.formularioLogin.get('email').value).then(() => {
      this.close('LOADING');
      this.msgTitulo = "Concluído";
      this.msgCorpo = "Um email foi encaminhado para você redifinir a senha, verifique sua caixa de entrada!";
      this.show('SUCCESS');
    }).catch(err => {
      this.close('LOADING');
      this.msgTitulo = "Atenção";
      this.msgCorpo = err.message;
      this.show('ALERT');
    });;
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
    this.formularioCadastroLogin.reset();
    this.formularioLogin.reset();
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
