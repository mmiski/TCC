import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Veiculo } from '../classes/Veiculo';
import { Usuario } from '../classes/Usuario';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VeiculoService {

  veiculo: Veiculo;
  key = "";

  constructor(public afDataBase: AngularFireDatabase) { 
  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/Veiculos/${key}`);
  }

  lista(): FirebaseListObservable<any>{

    return this.afDataBase.list(`/Clientes/${this.key}/Veiculos`);
  }

  alterar(key: string, veiculo: Veiculo){

        return this.lista().update(key, veiculo);
  }

  novo(veiculo: Veiculo){
    debugger;
    return this.lista().push(veiculo);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/Veiculos/`, {
        query: {
          orderByChild: 'titulo',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Veículo já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
