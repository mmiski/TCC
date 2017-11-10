import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { PlanoMensalidade } from '../classes/PlanoMensalidade';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class PlanoMensalidadeService {

  planoMensalidade: PlanoMensalidade;
  usuario: Usuario;
  key ="";

  constructor(public afDataBase: AngularFireDatabase) { 

  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/PlanosMensalidade/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    
        return this.afDataBase.list(`/Clientes/${this.key}/PlanosMensalidade`);
      }
  
  alterar(key: string, planoMensalidade: PlanoMensalidade){

        return this.lista().update(key, planoMensalidade);
  }

  novo(planoMensalidade: PlanoMensalidade){
    debugger;
    return this.lista().push(planoMensalidade);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/PlanosMensalidade`, {
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
