import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Passageiro } from '../classes/Passageiro';
import { Usuario } from '../classes/Usuario';
import { Posicao } from '../classes/Posicao';

@Injectable()
export class PassageiroService {

  passageiro: Passageiro;
  usuario: Usuario;
  key ="";


  constructor(public afDataBase: AngularFireDatabase) { 
  }

  getDados(key: string){
    debugger;
    return this.afDataBase.list(`/Clientes/${this.key}/Passageiros/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    
        return this.afDataBase.list(`/Clientes/${this.key}/Passageiros`,{
          query: {
          orderByChild: 'nome'
          }
          });
      }

  alterar(key: string, passageiro: Passageiro){

        return this.lista().update(key, passageiro);
  }

  novo(passageiro: Passageiro){
    debugger;
    return this.lista().push(passageiro);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/Passageiros`, {
        query: {
          orderByChild: 'titulo',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Passageiro já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }

}
