import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RotaPassageiroService } from '../services/rota-passageiro.service';
import { AuthService } from '../services/auth.service';
import { PassageiroService } from '../services/passageiro.service';

@Component({
  selector: 'app-rota-mapa',
  templateUrl: './rota-mapa.component.html',
  styleUrls: ['./rota-mapa.component.css']
})
export class RotaMapaComponent{

  listaRotaPassageiros: Array<RotaPassageiroDTO>;
  rotaKey: string = "";
  zoom: number = 14;
  constructor(public router: Router, public route: ActivatedRoute, public _serviceRotaPassageiro: RotaPassageiroService, public _serviceAuth: AuthService, public _servicePassageiro: PassageiroService) {

    this.route.params.subscribe(parans => {
      this.rotaKey = parans['rotaKey'];
        if (this.rotaKey ) {
            this._serviceRotaPassageiro.clienteKey = _serviceAuth.usuario.identificacaoCliente;
            this._serviceRotaPassageiro.rotaKey = this.rotaKey; 
            this._servicePassageiro.key = _serviceAuth.usuario.identificacaoCliente;
            this.listaRotaPassageiros = new Array<RotaPassageiroDTO>();

            this._serviceRotaPassageiro.lista().subscribe(dados => {
              this.listaRotaPassageiros = new Array<RotaPassageiroDTO>();
              dados.forEach(element => {
                let rpN = new RotaPassageiroDTO();
                rpN.ordem = element.ordem;

                this._servicePassageiro.getDados(element.passageiroKey).subscribe(cnt => {
                  if (cnt.length > 0) {
                    cnt.forEach(pass => {
                      if (pass.$key == 'cpf') {
                        rpN.cpf = pass.$value; 
                      }else if (pass.$key == 'nome') {
                        rpN.nome = pass.$value;  
                      } else if (pass.$key == 'latitude') {
                        rpN.latitude = pass.$value; 
                      }else if (pass.$key == 'longitude') {
                        rpN.longitude = pass.$value;  
                      }                      
                    });
                        
                    this.listaRotaPassageiros.push(rpN);
                  }
                });

                
              });
            });
      }
    });

   }

  gridRota() {
    this.router.navigate(['gridRota']);
  }

}
class RotaPassageiroDTO{
  public longitude: string = "";
  public latitude: string = "";
  public ordem: number = 0;
  public nome: string = "";
  public cpf: string = "";
}
