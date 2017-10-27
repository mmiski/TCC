import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { AuthService } from './auth.service';
import { PlanoMensalidade } from '../classes/PlanoMensalidade';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class PlanoMensalidadeService {

  planoMensalidade: PlanoMensalidade;
  usuario: Usuario;
  caminho: string = "";
  lista: FirebaseListObservable<any>;

  constructor(public afDataBase: AngularFireDatabase, private _serviceUser: AuthService ) { 
    this.usuario = this._serviceUser.getDadosUsuarioDataBase(0);
    this.caminho = '/Clientes/'+this.usuario.identificacaoCliente+'/PlanosMensalidade';
    this.lista = this.afDataBase.list(this.caminho);
  }

  getDados(key: string){
    return this.afDataBase.list(`${this.caminho}/${key}`);
  }

  
  alterar(key: string, planoMensalidade: PlanoMensalidade){

        return this.lista.update(key, planoMensalidade);
  }

  novo(planoMensalidade: PlanoMensalidade){
    debugger;
    return this.lista.push(planoMensalidade);
  }
  
  deleta(key: string){
    return this.lista.remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(this.caminho, {
        query: {
          orderByChild: 'titulo',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Plano de Mensalidade já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
