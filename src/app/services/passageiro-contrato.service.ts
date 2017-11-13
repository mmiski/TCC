import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { PassageiroContrato } from '../classes/PassageiroContrato';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class PassageiroContratoService {

  passageiroContrato: PassageiroContrato;
  usuario: Usuario;
  clienteKey = "";
  passageiroKey = "";

  constructor(public afDataBase: AngularFireDatabase) { 
  }

  lista(): FirebaseListObservable<any>{
      debugger;
      return this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Contratos`,{
        query: {
        orderByChild: 'titulo'
        }
        });
  }

  novo(passageiroContrato: PassageiroContrato){
    return this.lista().push(passageiroContrato);
  }

  assinar(assinado: boolean = false, key: string = ""){
    debugger;
    return this.lista().update(key, {assinado: assinado});
  }

  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/Clientes/${this.clienteKey}/Passageiros/${this.passageiroKey}/Contratos`, {
        query: {
          orderByChild: 'dataVencimento',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Contrato já vínculado com o passageiro.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
