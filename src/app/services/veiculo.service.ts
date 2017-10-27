import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularFire2/database';
import { AuthService } from './auth.service';
import { Veiculo } from '../classes/Veiculo';
import { Usuario } from '../classes/Usuario';

@Injectable()
export class VeiculoService {

  veiculo: Veiculo;
  usuario: Usuario;
  caminho: string = "";
  lista: FirebaseListObservable<any>;

  constructor(public afDataBase: AngularFireDatabase, private _serviceUser: AuthService ) { 
    this.usuario = this._serviceUser.getDadosUsuarioDataBase(0);
    this.caminho = '/Clientes/'+this.usuario.identificacaoCliente+'/Veiculos';
    this.lista = this.afDataBase.list(this.caminho);
  }

  getDados(key: string){
    return this.afDataBase.list(`${this.caminho}/${key}`);
  }

  
  alterar(key: string, veiculo: Veiculo){

        return this.lista.update(key, veiculo);
  }

  novo(veiculo: Veiculo){
    debugger;
    return this.lista.push(veiculo);
  }
  
  deleta(key: string){
    return this.lista.remove(key);
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
          reject(new Error("Veículo já cadastrado.")); 
        }else{
          resolve();
        }
      });    
    });
  }
  

}
