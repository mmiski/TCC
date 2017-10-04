import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-rotas',
  templateUrl: './grid-rotas.component.html',
  styleUrls: ['./grid-rotas.component.css']
})
export class GridRotasComponent {

  constructor(public router: Router) { }

  cadRotas(){
    this.router.navigate(['cadRota']);
  }
}
