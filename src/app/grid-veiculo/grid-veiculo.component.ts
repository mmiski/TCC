import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-veiculo',
  templateUrl: './grid-veiculo.component.html',
  styleUrls: ['./grid-veiculo.component.css']
})
export class GridVeiculoComponent {

  constructor(public router: Router) { }

  cadVeiculo(){
    this.router.navigate(['cadVeiculo']);
  }
}
