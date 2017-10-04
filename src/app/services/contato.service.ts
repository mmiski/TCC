import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularFire2/database";
import { Contato } from '../classes/Contato';

@Injectable()
export class ContatoService {

  constructor(public afDataBase: AngularFireDatabase) { 


  }

  enviar(contato: Contato){
    return this.afDataBase.list('/Contatos').push(contato);
  }

}
