import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Responsavel } from '../classes/Responsavel';
import { Usuario } from '../classes/Usuario';
import { Posicao } from '../classes/Posicao';

@Injectable()
export class ResponsavelService {

  responsavel: Responsavel;
  usuario: Usuario;
  key ="";


  constructor(public afDataBase: AngularFireDatabase) { 

  }


  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/Responsaveis/${key}`);
  }

  listaResponsaveis(): FirebaseListObservable<any>{
    return this.afDataBase.list(`/Clientes/${this.key}/Responsaveis`)
  }
  
  alterar(key: string, responsavel: Responsavel){
        return this.listaResponsaveis().update(key, responsavel);
  }

  novo(responsavel: Responsavel){
    return this.listaResponsaveis().push(responsavel);
  }
  
  deleta(key: string){
    return this.listaResponsaveis().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/Responsaveis`, {
        query: {
          orderByChild: 'cpf',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Responsável já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }

}
