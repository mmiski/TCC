import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-usuario',
  templateUrl: './grid-usuario.component.html',
  styleUrls: ['./grid-usuario.component.css']
})
export class GridUsuarioComponent{

  constructor(public router: Router) { }

  cadUsuario(){
    this.router.navigate(['cadUsuario']);
  }

}
