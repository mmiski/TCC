import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { AuthService } from './auth.service';
import { Responsavel } from '../classes/Responsavel';
import { Usuario } from '../classes/Usuario';
import { Posicao } from '../classes/Posicao';

@Injectable()
export class ResponsavelService {

  responsavel: Responsavel;
  usuario: Usuario;
  caminho: string = "";
  listaResponsaveis: FirebaseListObservable<any>;


  constructor(public afDataBase: AngularFireDatabase, private _serviceUser: AuthService) { 
    this.usuario = this._serviceUser.getDadosUsuarioDataBase(0);
    this.caminho = `/Clientes/${this.usuario.identificacaoCliente}/Responsaveis`;
    this.listaResponsaveis = afDataBase.list(this.caminho);
  }


  getDados(key: string){
    return this.afDataBase.list(`${this.caminho}/${key}`);
  }

  
  alterar(key: string, responsavel: Responsavel){
        return this.listaResponsaveis.update(key, responsavel);
  }

  novo(responsavel: Responsavel){
    return this.listaResponsaveis.push(responsavel);
  }
  
  deleta(key: string){
    return this.listaResponsaveis.remove(key);
  }

  isDuplicado(valor: string = ""){
    return new Promise((resolve, reject) => {
      let flag = false;

      this.afDataBase.list(this.caminho, {
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
