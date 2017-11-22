import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularFire2/database";
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { AcessoMobile } from '../classes/AcessoMobile';

@Injectable()
export class AcessoMobileService {

clienteKey: string = "";

  constructor(public afDataBase: AngularFireDatabase) { 


  }

 
  getDados(key: string){
    return this.afDataBase.list(`/AcessosMobile/${key}`);
  }

  lista(): FirebaseListObservable<any>{
    
        return this.afDataBase.list(`/AcessosMobile/`,{
            query: {
            orderByChild: 'clienteKey',
            equalTo: this.clienteKey
            }
            });
      }

  
  deleta(key: string){
    return this.lista().remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(`/AcessosMobile`, {
        query: {
          orderByChild: 'usuarioKey',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Essa pessoa já contém acesso mobile liberado.")); 
        }else{
          resolve();
        }
      });    
    });
  }

}
