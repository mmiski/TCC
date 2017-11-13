import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Usuario } from '../classes/Usuario';
import { AreaAtuacao } from '../classes/AreaAtuacao';

@Injectable()
export class AreaAtuacaoService {

  usuario: Usuario;
  key = "";

  constructor(public afDataBase: AngularFireDatabase) { 
    debugger;
  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/AreasAtuacao/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    
        return this.afDataBase.list(`/Clientes/${this.key}/AreasAtuacao`,{
          query: {
          orderByChild: 'descricao'
          }
          });
  }

  alterar(key: string, areaAtuacao: AreaAtuacao){

        return this.lista().update(key, areaAtuacao);
  }

  novo(areaAtuacao: AreaAtuacao){
    debugger;
    return this.lista().push(areaAtuacao);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/AreasAtuacao`, {
        query: {
          orderByChild: 'descricao',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Área de Atuação já cadastrada.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
