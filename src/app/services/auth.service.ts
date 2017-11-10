import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";
import { Usuario } from '../classes/Usuario';
import { AngularFireDatabase } from "angularFire2/database";
import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';
import { UsuarioService } from './usuario.service';
import { Cliente } from '../classes/Cliente';
import { Provider } from '@angular/core/src/di/provider';

@Injectable()
export class AuthService{

    authState: Observable<firebase.User>;
    usuario: Usuario;

    constructor(public afAuth: AngularFireAuth, public afDataBase: AngularFireDatabase, public _serviceCliente: ClienteService,public _serviceUsuario: UsuarioService){
        this.authState = afAuth.authState;
        this.usuario = new Usuario();
    }


    loginEmailSenha(email: string, senha: string ){
        return this.afAuth.auth.signInWithEmailAndPassword(email, senha).then(() => this.geraUsuario(0));
    }

    signInWithPopup(tipo: number){
        let provider = tipo == 1 ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider).then(() => this.geraUsuario(1));
    }

    
    cadastroUsuarioEmailSenha(email: string, senha: string, nome: string ){
        debugger;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, senha).then((dados) => {
            this.cadastraUsuarioDataBase(dados.email, dados.uid, nome).then(() => this.geraUsuario(0));
        });
    }

   private cadastroUsuarioProvider(usuario: firebase.User){
        let cadUsuario = new Usuario();
        cadUsuario.nome = usuario.displayName;
        cadUsuario.email = usuario.email;
        cadUsuario.imagemUsuario = usuario.photoURL;
        cadUsuario.uid = usuario.uid;
        cadUsuario.bloqueado = false;
       
        return this.afDataBase.list('/Usuarios').push(cadUsuario).then((dadosU) => {
            this._serviceCliente.criarClienteNovo().then((dadosC) => {
                cadUsuario.identificacaoCliente = dadosC.key;
                cadUsuario.keyDuplicadoUsuario = dadosU.key;
                this._serviceUsuario.salvaUsuario(cadUsuario).then(() => this.geraUsuario(0));
            });
        });
    }


    logout(){
        return this.afAuth.auth.signOut();
    }

    private cadastraUsuarioDataBase(email:string, uid: string, nome: string){
        let cadUsuario = new Usuario();
        cadUsuario.email = email;
        cadUsuario.uid = uid;
        cadUsuario.nome = nome;
        cadUsuario.imagemUsuario = 'http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/256/blue-user-icon.png';     
        debugger;
        return this.afDataBase.list('/Usuarios').push(cadUsuario).then((dadosU) => {
            this._serviceCliente.criarClienteNovo().then((dadosC) => {
                cadUsuario.identificacaoCliente = dadosC.key;
                cadUsuario.keyDuplicadoUsuario = dadosU.key;
                this._serviceUsuario.salvaUsuario(cadUsuario);
            });
        });
    }

    excluiUsuario(){     
            return this.afAuth.auth.currentUser.delete(); 
    }

    excluiUsuarioDataBase(key: string){
        debugger;
        return this.afDataBase.list('/Usuarios').remove(key);
    }

    geraUsuario(localChamada: number){
        let retornoUsuario = new Usuario();
        this.authState.subscribe((usuario: firebase.User)=>{
            if (usuario != null) {
                this.lstUsuarioDataBase(usuario.uid).subscribe(dados => {
                    debugger;
                    if (dados.length == 0 && localChamada == 1) {
                        this.cadastroUsuarioProvider(usuario).then(() =>{
                            this.geraUsuario(0);                 
                        });
                    }else{
                        this.usuario .nome = dados[0].nome;
                        this.usuario .email = dados[0].email;
                        this.usuario .imagemUsuario = dados[0].imagemUsuario;
                        this.usuario .identificacaoCliente = dados[0].identificacaoCliente;
                        this.usuario .uid = dados[0].uid;
                        this.usuario .bloqueado = dados[0].vinculado;
                        this.usuario .keyDuplicadoUsuario = dados[0].keyDuplicadoUsuario;
                    }               
                });
            }         
        })
    }

    getDadosClienteDataBase(): Cliente{
        let retornoCliente= new Cliente();
               
        this.lstUsuarioDataBase(this.usuario.uid).subscribe((dadosU) => {
            this._serviceCliente.lstClienteDataBase(this.usuario.identificacaoCliente).subscribe((dados) => {
                debugger;
                dados.forEach(element => {
                    debugger;
                    if (element.$key == 'cnpjCpf') {
                        retornoCliente.cnpjCpf = element.$value; 
                    }
                    else if (element.$key == 'email') {
                        retornoCliente.email = element.$value; 
                    }
                    else if (element.$key == 'razaoSocial') {
                        retornoCliente.razaoSocial = element.$value; 
                    }
                    else if (element.$key == 'nome') {
                        retornoCliente.nome = element.$value; 
                    }
                    else if (element.$key == 'nomeFantasia') {
                        retornoCliente.nomeFantasia = element.$value; 
                    }
                    else if (element.$key == 'telefone') {
                        retornoCliente.telefone = element.$value; 
                    }
                });  
            });
          });

        return retornoCliente;
    }

    lstUsuarioDataBase(uid: string){
        return this.afDataBase.list('/Usuarios', {
            query: {
                orderByChild: 'uid',
                equalTo: uid 
              }
        });
    }

    lstUsuariosCliente(keyCliente: string){
        return this.afDataBase.list('/Usuarios', {
            query: {
                orderByChild: 'identificacaoCliente',
                equalTo: keyCliente 
              }
        });
    }

}