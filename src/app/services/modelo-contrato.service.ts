import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { ModeloContrato } from '../classes/ModeloContrato';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class ModeloContratoService {

  modeloContrato: ModeloContrato;
  usuario: Usuario;
  key = "";

  constructor(public afDataBase: AngularFireDatabase) { 
  }

  getDados(key: string){
    debugger;
    return this.afDataBase.list(`/Clientes/${this.key}/ModelosContrato/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    
      return this.afDataBase.list(`/Clientes/${this.key}/ModelosContrato`,{
        query: {
        orderByChild: 'titulo'
        }
        });
  }

  alterar(key: string, modeloContrato: ModeloContrato){

        return this.lista().update(key, modeloContrato);
  }

  novo(modeloContrato: ModeloContrato){
    return this.lista().push(modeloContrato);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/ModelosContrato`, {
        query: {
          orderByChild: 'titulo',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Contrato já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
