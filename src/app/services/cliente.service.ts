import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularFire2/database";
import { Cliente } from '../classes/Cliente';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';

@Injectable()
export class ClienteService {

  constructor(public afDataBase: AngularFireDatabase) { 


  }

  criarClienteNovo(){
    let clienteNovo = new Cliente();
    clienteNovo.nome = 'Nova Empresa';
    clienteNovo.nomeFantasia = 'Nova Empresa';
    clienteNovo.razaoSocial = 'Nova Empresa';
    clienteNovo.cnpjCpf = '00000000000000';
    clienteNovo.email = 'nova.empresa@nova.com.br';
    clienteNovo.telefone = '0000-0000';
    return this.afDataBase.list('/Clientes').push(clienteNovo);
  }


lstClienteDataBase(key: string){
  debugger;
  return this.afDataBase.list('/Clientes/'+key);
}

  salvaCliente(cliente: Cliente, key: string){
    debugger;
   return this.afDataBase.list('/Clientes').update(key, cliente);
  }

  deletaCliente(key: string){
   return this.afDataBase.list('/Clientes').remove(key);
  }

}
