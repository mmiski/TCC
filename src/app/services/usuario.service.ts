import { Injectable } from "@angular/core";
import { Usuario } from '../classes/Usuario';
import { AngularFireDatabase } from "angularFire2/database";



@Injectable()
export class UsuarioService{

    constructor(public afDataBase: AngularFireDatabase){

    }

    salvaUsuario(usuario: Usuario){
      debugger;
      this.afDataBase.list('/Usuarios').update(usuario.keyDuplicadoUsuario, usuario);
    }
}