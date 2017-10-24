import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'label-error',
  templateUrl: './label-error.component.html',
  styleUrls: ['./label-error.component.css']
})
export class LabelErrorComponent implements OnInit {

  @Input() mostrarErro: boolean;
  @Input() mensagemErro: string;

  constructor() { }

  ngOnInit() {
  }

}
