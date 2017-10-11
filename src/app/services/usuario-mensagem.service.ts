import { Injectable } from '@angular/core';
import { UsuarioMensagem } from '../classes/UsuarioMensagem';
import { AngularFireDatabase } from 'angularFire2/database';

@Injectable()
export class UsuarioMensagemService {

  constructor(public afDataBase: AngularFireDatabase) { }
  
  enviar(contato: UsuarioMensagem){
    return this.afDataBase.list('/MensagensDeUsuarios').push(contato);
  }
}
