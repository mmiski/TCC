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
    
        return this.afDataBase.list(`/Clientes/${this.key}/PlanosMensalidade`,{
          query: {
          orderByChild: 'titulo'
          }
          });
      }
  
  alterar(key: string, planoMensalidade: PlanoMensalidade){

        return this.lista().update(key, planoMensalidade);
  }

  novo(planoMensalidade: PlanoMensalidade){
    debugger;
    return this.lista().push(planoMensalidade);
  }
  
  deleta(key: string){
    return new Promise((resolve, reject) => {
      let flag = false;
      this.afDataBase.list(`/Clientes/${this.key}/Passageiros`).subscribe((listaPassageiros) => {
        
        listaPassageiros.forEach((passageiro, index) => {
          debugger;
          this.afDataBase.list(`/Clientes/${this.key}/Passageiros/${passageiro.$key}/Mensalidades`, {
            query: {
              orderByChild: 'mensalidadeKey',
              equalTo: key
            }
          }).subscribe((mensalidades)=>{
            debugger;
            if (mensalidades.length > 0) {
              flag = true;
            }

            debugger;
            if (flag) {
              reject(new Error("Mensalidade vinculada a um Passageiro!")); 
            }else if(index == listaPassageiros.length - 1){
              this.lista().remove(key).then(() => {
                resolve();
              }).catch(err => {
                reject(new Error(err.message)); 
              });
            }

          });
        });
      });    
    });
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
