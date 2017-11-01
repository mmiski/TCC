import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent  {

  constructor(public router: Router, public http: Http) { 

  }
  rua: string;
  numero: '35';
  bairro: string;
  cidade: string;
  estado: string;
  pais: 'Brasil';

  maps = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.rua},${this.bairro},${this.cidade},${this.pais}&key=AIzaSyAvOdpKx_WqECI5MBuE3UaHE63t-Ik3a3A`;
  cep = "https://viacep.com.br/ws/85502360/json/"

  

  pagContato(){

    this.router.navigate(['contato']);
  }

  getTest(){

    this.http.get(this.cep)
    .map(res => res.json())
    .subscribe(dados => {
      this.rua = dados.logradouro;
      this.bairro = dados.bairro;
      this.cidade = dados.localidade;
      this.estado = dados.uf;

      this.maps = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.rua},${this.bairro},${this.cidade},${this.pais}&key=AIzaSyAvOdpKx_WqECI5MBuE3UaHE63t-Ik3a3A`;

      this.http.get(this.maps)
      .map(res => res.json())
      .subscribe(teste => {
        debugger;
        
      });
      
    });
  }

}
