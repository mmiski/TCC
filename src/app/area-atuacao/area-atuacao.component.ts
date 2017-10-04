import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-atuacao',
  templateUrl: './area-atuacao.component.html',
  styleUrls: ['./area-atuacao.component.css']
})
export class AreaAtuacaoComponent  {
  
    constructor(public router: Router) { }
  
    cadAreaAtuacao(){
      this.router.navigate(['cadAreaAtuacao']);
    }

}
