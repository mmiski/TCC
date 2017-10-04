import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../classes/Cliente';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../classes/Usuario';

@Component({
  selector: 'app-dados-empresa',
  templateUrl: './dados-empresa.component.html',
  styleUrls: ['./dados-empresa.component.css']
})
export class DadosEmpresaComponent  {

cliente: Cliente;
usuario: Usuario;

  constructor(public _serviceCliente: ClienteService, public _serviceAuth: AuthService) { 
    this.usuario = this._serviceAuth.getDadosUsuarioDataBase(0);
    this.cliente = this._serviceAuth.getDadosClienteDataBase();
  } 

  salvar(){
    this._serviceCliente.salvaCliente(this.cliente,this.usuario.identificacaoCliente);
  }

}
