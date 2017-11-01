import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { AuthService } from './auth.service';
import { Passageiro } from '../classes/Passageiro';
import { Usuario } from '../classes/Usuario';
import { Posicao } from '../classes/Posicao';

@Injectable()
export class PassageiroService {

  passageiro: Passageiro;
  usuario: Usuario;
  caminho: string = "";
  listaPassageiros: FirebaseListObservable<any>;


  constructor(public afDataBase: AngularFireDatabase, private _serviceUser: AuthService) { 
    this.usuario = this._serviceUser.getDadosUsuarioDataBase(0);
    this.caminho = `/Clientes/${this.usuario.identificacaoCliente}/Passageiros`;
    this.listaPassageiros = this.afDataBase.list(this.caminho);
  }

  getDados(key: string){
    return this.afDataBase.list(`${this.caminho}/${key}`);
  }

  
  alterar(key: string, passageiro: Passageiro){

        return this.listaPassageiros.update(key, passageiro);
  }

  novo(passageiro: Passageiro){
    debugger;
    return this.listaPassageiros.push(passageiro);
  }
  
  deleta(key: string){
    return this.listaPassageiros.remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(this.caminho, {
        query: {
          orderByChild: 'titulo',
          equalTo: valor
        }
      }).subscribe((dados) => {
        debugger;
        if (dados.length > 0) {
          reject(new Error("Passageiro já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }

}
