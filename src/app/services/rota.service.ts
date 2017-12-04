import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Rota } from '../classes/Rota';
import { Usuario } from '../classes/Usuario';
import { Posicao } from '../classes/Posicao';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class RotaService {

  rota: Rota;
  usuario: Usuario;
  key ="";


  constructor(public afDataBase: AngularFireDatabase) { 

  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.key}/Rotas/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    return this.afDataBase.list(`/Clientes/${this.key}/Rotas`,{
      query: {
      orderByChild: 'nome'
      }
      })
  }
  
  alterar(key: string, rota: Rota){
        return this.lista().update(key, rota);
  }

  novo(rota: Rota){
    return this.lista().push(rota);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.key}/Rotas`).subscribe((dados) => {
        dados.forEach(element => {
            if (element.descricao == valor) {
                    reject(new Error("Rota já cadastrada."));                     
            }
        });  
        resolve();     
      });    
    });
  }

}
