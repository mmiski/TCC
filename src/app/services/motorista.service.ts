import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Motorista } from '../classes/Motorista';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class MotoristaService {

  motorista: Motorista;
  usuario: Usuario;
  key = "";

  constructor(public afDataBase: AngularFireDatabase ) {    
  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/Motoristas/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    
        return this.afDataBase.list(`/Clientes/${this.key}/Motoristas`,{
          query: {
          orderByChild: 'nome'
          }
          });
      }
  
  alterar(key: string, motorista: Motorista){

        return this.lista().update(key, motorista);
  }

  novo(motorista: Motorista){
    debugger;
    return this.lista().push(motorista);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/Motoristas`, {
        query: {
          orderByChild: 'titulo',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Motorista já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
