import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { Usuario } from '../classes/Usuario';
import { Posicao } from '../classes/Posicao';
import { forEach } from '@angular/router/src/utils/collection';
import { RotaPassageiro } from '../classes/RotaPassageiro';

@Injectable()
export class RotaPassageiroService {

  rotaPassageiro: RotaPassageiro;
  usuario: Usuario;
  clienteKey ="";
  rotaKey ="";


  constructor(public afDataBase: AngularFireDatabase) { 

  }

  getDados(rotaKey: string, passRotaKey: string){
    return this.afDataBase.list(`/Clientes/${this.clienteKey}/Rotas/${rotaKey}/Passageiros/${passRotaKey}`);
  }

  lista(): FirebaseListObservable<any>{
    return this.afDataBase.list(`/Clientes/${this.clienteKey}/Rotas/${this.rotaKey}/Passageiros`,{
      query: {
      orderByChild: 'ordem'
      }
      })
  }
  
  alterar(key: string, rotaPassageiro: RotaPassageiro){
        return this.lista().update(key, rotaPassageiro);
  }

  novo(rotaPassageiro: RotaPassageiro){
    return this.lista().push(rotaPassageiro);
  }
  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.clienteKey}/Rotas/${this.rotaKey}/Passageiros`).subscribe((dados) => {
        dados.forEach(element => {
            if (element.passageiroKey == valor) {
                    reject(new Error("Passageiro já vinculado."));                     
            }
        });  
        resolve();     
      });    
    });
  }

}
