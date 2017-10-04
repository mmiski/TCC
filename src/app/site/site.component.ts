import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Contato } from '../classes/Contato';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent  {

  modalContato = new EventEmitter<string|MaterializeAction>();
  contato: Contato;

  modelContatoParams = [
    {
      dismissible: true,
      complete: () => {
        this.contato = new Contato();
      }
    }
  ]

  constructor(public _serviceContato: ContatoService) { 
    this.contato = new Contato();
  }

  openModalContato() {
    this.modalContato.emit({action:"modal",params:['open']});
  }

  closeModalContato() {
    this.modalContato.emit({action:"modal",params:['close']});
  }

  enviar(){
    this._serviceContato.enviar(this.contato).then(() => {
      this.closeModalContato();
    });
  }

}
