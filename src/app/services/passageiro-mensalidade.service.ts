import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { PassageiroMensalidade } from '../classes/PassageiroMensalidade';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class PassageiroMensalidadeService {

  passageiroMensalidade: PassageiroMensalidade;
  usuario: Usuario;
  clienteKey = "";
  passageiroKey = "";

  constructor(public afDataBase: AngularFireDatabase) { 
  }

  lista(): FirebaseListObservable<any>{
      return this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Mensalidades`,{
        query: {
        orderByChild: 'titulo'
        }
        });
  }

  getDados(key: string){
    return this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Mensalidades/${key}`);
  }

  novo(passageiroMensalidade: PassageiroMensalidade){
    return this.lista().push(passageiroMensalidade);
  }

  alterar(key: string, passageiroMensalidade: PassageiroMensalidade){
    
       return this.lista().update(key, passageiroMensalidade);
  }

  deleta(key: string){
    debugger;
    return this.lista().remove(key);
  }

  isDuplicado(dataVencimento: string = "", mensalidadeKey: string = "" ){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Mensalidades`).subscribe((dados) => {

        dados.forEach(element => {
          if (element.dataVencimento >= dataVencimento && element.mensalidadeKey == mensalidadeKey) {
            reject(new Error("Passageiro já contém esse Mensalidade vigente no mesmo período!")); 
          }else{
            resolve();
          }
        });
        if (dados.length == 0) {
          resolve();
        }
      });    
    });
  }
  

}
