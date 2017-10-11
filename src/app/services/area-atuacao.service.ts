import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularFire2/database';
import { AuthService } from './auth.service';
import { Usuario } from '../classes/Usuario';
import { AreaAtuacao } from '../classes/AreaAtuacao';

@Injectable()
export class AreaAtuacaoService {

  usuario: Usuario;
  caminho: string = "";

  constructor(public afDataBase: AngularFireDatabase, private _serviceUser: AuthService ) { 
    this.usuario = this._serviceUser.getDadosUsuarioDataBase(0);
    this.caminho = `/Clientes/${this.usuario.identificacaoCliente}/AreasAtuacao`;
  }

  dados(key: string){
    return this.afDataBase.list(this.caminho);
  }
  
  salvar(key: string, areaAtuacao: AreaAtuacao){

      if (key == null || key == "") {
        return this.afDataBase.list(this.caminho).push(areaAtuacao);
      } else{
        return this.afDataBase.list(this.caminho).update(key, areaAtuacao);
      }
    }
  
    deleta(key: string){
     return this.afDataBase.list(this.caminho).remove(key);
    }

}
