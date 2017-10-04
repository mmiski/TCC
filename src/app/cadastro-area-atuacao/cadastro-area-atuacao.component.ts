import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-area-atuacao',
  templateUrl: './cadastro-area-atuacao.component.html',
  styleUrls: ['./cadastro-area-atuacao.component.css']
})
export class CadastroAreaAtuacaoComponent {

  constructor(public router: Router) { }

  gridAreaAtuacao(){
    this.router.navigate(['areaAtuacao']);
  }
}
