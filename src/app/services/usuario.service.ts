import { Injectable } from "@angular/core";
import { Usuario } from '../classes/Usuario';
import { AngularFireDatabase } from "angularFire2/database";



@Injectable()
export class UsuarioService{

    constructor(public afDataBase: AngularFireDatabase){

    }

    salvaUsuario(usuario: Usuario){
     return this.afDataBase.list('/Usuarios').update(usuario.keyDuplicadoUsuario, usuario);
    }
}