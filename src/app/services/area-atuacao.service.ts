import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { AuthService } from './auth.service';
import { Usuario } from '../classes/Usuario';
import { AreaAtuacao } from '../classes/AreaAtuacao';

@Injectable()
export class AreaAtuacaoService {

  usuario: Usuario;
  caminho: string = "";
  lista: FirebaseListObservable<any>;

  constructor(public afDataBase: AngularFireDatabase, private _serviceUser: AuthService ) { 
    this.usuario = this._serviceUser.usuario;
    this.caminho = '/Clientes/'+this.usuario.identificacaoCliente+'/AreasAtuacao';
    this.lista = this.afDataBase.list(this.caminho);
    debugger;
  }

  getDados(key: string){
    return this.afDataBase.list(`${this.caminho}/${key}`);
  }

  
  alterar(key: string, areaAtuacao: AreaAtuacao){

        return this.lista.update(key, areaAtuacao);
  }

  novo(areaAtuacao: AreaAtuacao){
    debugger;
    return this.lista.push(areaAtuacao);
  }
  
  deleta(key: string){
    return this.lista.remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(this.caminho, {
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
