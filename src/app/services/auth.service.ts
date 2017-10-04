import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";
import { Usuario } from '../classes/Usuario';
import { AngularFireDatabase } from "angularFire2/database";
import { Injectable } from '@angular/core';
import { ClienteService } from './cliente.service';
import { UsuarioService } from './usuario.service';
import { Cliente } from '../classes/Cliente';

@Injectable()
export class AuthService{

    authState: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth, public afDataBase: AngularFireDatabase, public _serviceCliente: ClienteService,public _serviceUsuario: UsuarioService){
        this.authState = afAuth.authState;
    }


    loginEmailSenha(email: string, senha: string ){
        return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
    }

    cadastroUsuarioEmailSenha(email: string, senha: string ){
        debugger;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, senha).then((dados) => {
            debugger;
            this.cadastraUsuarioDataBase(dados.email, dados.uid, dados.providerId);
        });
    }

   private cadastroUsuarioProvider(usuario: firebase.User){
        let cadUsuario = new Usuario();
        cadUsuario.nome = usuario.displayName;
        cadUsuario.email = usuario.email;
        cadUsuario.imagemUsuario = usuario.photoURL;
        cadUsuario.provider = usuario.providerId;
        cadUsuario.uid = usuario.uid;
        cadUsuario.vinculado = false;
       
        return this.afDataBase.list('/Usuarios').push(cadUsuario).then((dadosU) => {
            this._serviceCliente.criarClienteNovo().then((dadosC) => {
                cadUsuario.identificacaoCliente = dadosC.key;
                cadUsuario.keyDuplicadoUsuario = dadosU.key;
                this._serviceUsuario.salvaUsuario(cadUsuario);
            });
        });
    }


    logout(){
        return this.afAuth.auth.signOut();
    }

    private cadastraUsuarioDataBase(email:string, uid: string, provider: string){
        let cadUsuario = new Usuario();
        cadUsuario.email = email;
        cadUsuario.uid = uid;
        cadUsuario.provider = provider;
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

    getDadosUsuarioDataBase(localChamada: number): Usuario{
        let retornoUsuario = new Usuario();
        debugger;
        this.authState.subscribe((usuario: firebase.User)=>{
            if (usuario != null) {
                this.lstUsuarioDataBase(usuario.uid).subscribe(dados => {
                    debugger;
                    if (dados.length == 0 && localChamada == 1) {
                        this.cadastroUsuarioProvider(usuario).then(() =>{
                            console.log('usuario cadastrado, provavelmente provider: '+ usuario.toString()); 
                            return this.getDadosUsuarioDataBase(0);                 
                        });
                    }else{
                    retornoUsuario.nome = dados[0].nome;
                    retornoUsuario.email = dados[0].email;
                    retornoUsuario.imagemUsuario = dados[0].imagemUsuario;
                    retornoUsuario.identificacaoCliente = dados[0].identificacaoCliente;
                    retornoUsuario.provider = dados[0].provider;
                    retornoUsuario.uid = dados[0].uid;
                    retornoUsuario.vinculado = dados[0].vinculado;
                    retornoUsuario.keyDuplicadoUsuario = dados[0].keyDuplicadoUsuario;
                    console.log('Retorno do método getDadosUsuarioDataBase: '+ dados.toString());     
                    }               
                });
            }         
        })

        return retornoUsuario;
    }

    getDadosClienteDataBase(): Cliente{
        let retornoCliente= new Cliente();
        this.authState.subscribe((usuario: firebase.User)=>{
          if (usuario != null) {
              this.lstUsuarioDataBase(usuario.uid).subscribe((dadosU) => {
                  debugger;
                this._serviceCliente.lstClienteDataBase(dadosU[0].identificacaoCliente).subscribe((dados) => {
                  debugger;
                  retornoCliente.razaoSocial = dados[4].$value;
                  retornoCliente.nomeFantasia = dados[3].$value;
                  retornoCliente.nome = dados[2].$value;
                  retornoCliente.email = dados[1].$value;
                  retornoCliente.cnpjCpf = dados[0].$value;           
                  retornoCliente.telefone = dados[5].$value;       
                });
              });
          }         
      })
               
    
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