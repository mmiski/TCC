import { Injectable } from "@angular/core";
import { Usuario } from '../classes/Usuario';
import { AngularFireDatabase, FirebaseListObservable } from "angularFire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "./auth.service";



@Injectable()
export class UsuarioService{

    usuario: Usuario;
    key = "";
    clienteKey = "";

    constructor(public afAuth: AngularFireAuth, public afDataBase: AngularFireDatabase, public _serviceAuth : AuthService){

    }

    getDados(key: string){
        return this.afDataBase.list(`/Usuarios/${key}`);
    }

    lista(): FirebaseListObservable<any>{
        
            return this.afDataBase.list(`/Usuarios`,{
              query: {
              orderByChild: 'nome'
              },
              });
      }
    
      alterar(usuario: Usuario){
    
            return this.lista().update(usuario.keyDuplicadoUsuario, usuario);
      }
    
      novo(email: string, senha: string, nome: string){
        return this.afAuth.auth.createUserWithEmailAndPassword(email, senha).then(dados => {
            debugger;
            let cadUsuario = new Usuario();
            cadUsuario.email = email;
            cadUsuario.uid = dados.uid;
            cadUsuario.nome = nome;
            cadUsuario.isAdm = false;
            cadUsuario.bloqueado = false;
            cadUsuario.imagemUsuario = 'http://icons.iconarchive.com/icons/double-j-design/origami-colored-pencil/256/blue-user-icon.png';    
            cadUsuario.identificacaoCliente = this._serviceAuth.usuario.identificacaoCliente; 
    
            return this.lista().push(cadUsuario).then((dadosU) => {    
                cadUsuario.keyDuplicadoUsuario = dadosU.key  
                this.alterar(cadUsuario);
            });
        });
      }
      
      deleta(key: string){
        return this.lista().remove(key);
      }
    
      bloquearDesbloquear( usuario: Usuario){
        return this.lista().update(usuario.keyDuplicadoUsuario, usuario);
      }

      isDuplicado(valor: string = ""){
        return new Promise((resolve, reject) => {
          let flag = false;
    
          this.afDataBase.list(`/Usuarios`, {
            query: {
              orderByChild: 'email',
              equalTo: valor
            }
          }).subscribe((dados) => {
            debugger;
            if (dados.length > 0) {
              reject(new Error("Já existe um usuário cadastrado com o mesmo Email.")); 
            }else{
              resolve();
            }
          });    
        });
      }
}