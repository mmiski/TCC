import { Component, OnInit } from '@angular/core';
import { AcessoMobileService } from '../services/acesso-mobile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AcessoMobile } from '../classes/AcessoMobile';
import { ResponsavelService } from '../services/responsavel.service';
import { PassageiroService } from '../services/passageiro.service';
import { MotoristaService } from '../services/motorista.service';

@Component({
  selector: 'app-visualiza-acesso',
  templateUrl: './visualiza-acesso.component.html',
  styleUrls: ['./visualiza-acesso.component.css']
})
export class VisualizaAcessoComponent {

  usuario: UsuarioDTO;
  acessoMobile: AcessoMobile;
  logado: boolean = false;
  key: string = "";

  constructor(public _serviceAuth: AuthService, public _serviceAcesso: AcessoMobileService, public router: Router, public route: ActivatedRoute, public _serviceResponsavel: ResponsavelService,
    public _servicePassageiro: PassageiroService, public _serviceMotorista: MotoristaService) { 

    this.usuario = new UsuarioDTO();
    this.acessoMobile = new AcessoMobile();
    this.logado = this._serviceAuth.afAuth.auth.currentUser != null ? true : false;

    this.route.params.subscribe(parans => {
     this.key  = parans['key']; 
    });
debugger;
    this._serviceAcesso.getDados(this.key).subscribe(dados => {
      dados.forEach(pass => {
        debugger;
        if (pass.$key == 'usuarioKey') {
          this.acessoMobile.usuarioKey = pass.$value; 
        }
        else if (pass.$key == 'clienteKey') {
          this.acessoMobile.clienteKey = pass.$value; 
        }
        else if (pass.$key == 'tipoUsuario') {
          this.acessoMobile.tipoUsuario = pass.$value; 
        }
        else if (pass.$key == 'codigo') {
          this.acessoMobile.codigo = pass.$value; 
          this.usuario.codigo = pass.$value;
        }
        else if (pass.$key == 'ultimoAcesso') {
          this.acessoMobile.ultimoAcesso = pass.$value; 
        }
        else if (pass.$key == 'dispositivoUltimoAcesso') {
          this.acessoMobile.dispositivoUltimoAcesso = pass.$value; 
        }
      });

      this._serviceMotorista.key = this.acessoMobile.clienteKey;
      this._servicePassageiro.key = this.acessoMobile.clienteKey;
      this._serviceResponsavel.key = this.acessoMobile.clienteKey;
      if (this.acessoMobile.tipoUsuario == 0) {
        this._servicePassageiro.getDados(this.acessoMobile.usuarioKey).subscribe(pass => {
          pass.forEach(element => {
            debugger;
            if (element.$key == 'nome') {
              this.usuario.nome = element.$value; 
            }
            if (element.$key == 'cpf') {
              this.usuario.cpf = element.$value; 
            }
          });      
        });
      } else if (this.acessoMobile.tipoUsuario == 1) {
        this._serviceMotorista.getDados(this.acessoMobile.usuarioKey).subscribe(pass => {
          pass.forEach(element => {
            if (element.$key == 'nome') {
              this.usuario.nome = element.$value; 
            }
            if (element.$key == 'cpf') {
              this.usuario.cpf = element.$value; 
            }
          });                
        });
      }else if (this.acessoMobile.tipoUsuario == 2) {
        this._serviceResponsavel.getDados(this.acessoMobile.usuarioKey).subscribe(pass => {
          pass.forEach(element => {
            if (element.$key == 'nome') {
              this.usuario.nome = element.$value; 
            }
            if (element.$key == 'cpf') {
              this.usuario.cpf = element.$value; 
            }
          });                
        });
      }
    });
  }

  listaAcessoMobile(){
    this.router.navigate(['listaAcessosMobile', this.acessoMobile.tipoUsuario]);
  }
}
class UsuarioDTO{
  public nome: string = "";
  public cpf: string = "";
  public codigo: string = "";
}