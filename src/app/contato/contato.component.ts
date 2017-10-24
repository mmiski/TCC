import { Component, EventEmitter, OnInit } from '@angular/core';
import { Contato } from '../classes/Contato';
import { ContatoService } from '../services/contato.service';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormControl,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  

  alert = new EventEmitter<string|MaterializeAction>();
  success = new EventEmitter<string|MaterializeAction>();
  danger = new EventEmitter<string|MaterializeAction>();  
  loading = new EventEmitter<string|MaterializeAction>();

  params = [
    {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.8, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
    }
  ]

  titulo: string = "";
  mensagem: string = "";

  formulario: FormGroup;


  
  constructor(private formBuilder: FormBuilder, 
              public _serviceContato: ContatoService, 
              public router: Router) { 
    
  }

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, Validators.required],
      texto: [null, Validators.required], 
    });
  }

  
  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo).valid &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  enviar(){
   this.show('LOADING');

  this._serviceContato.enviar(this.formulario.value).then(() => {
    this.close('LOADING');

    this.titulo = "Mensagem Enviada";
    this.mensagem = "Mensagem enviada para nossa equipe, assim que possível será respondida.";
    this.show('SUCCESS');
  }).catch(err =>{
    this.close('LOADING');
    this.titulo = "Atenção";
    this.mensagem = err.message;
    this.show('DANGER');
  });
   
  }

  show(tipo: string){
    if (tipo.toUpperCase() == "ALERT") {
      this.alert.emit({action:"modal",params:['open']});
    }
    else if(tipo.toUpperCase() == "DANGER"){
      this.danger.emit({action:"modal",params:['open']});
    }
    else if(tipo.toUpperCase() == "SUCCESS"){
      this.success.emit({action:"modal",params:['open']});
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['open']});
    }
  }

  close(tipo: string){
    if (tipo.toUpperCase() == "ALERT") {
      this.alert.emit({action:"modal",params:['close']});
    }
    else if(tipo.toUpperCase() == "DANGER"){
      this.danger.emit({action:"modal",params:['close']});
    }
    else if(tipo.toUpperCase() == "SUCCESS"){
      this.pagSite();
      this.success.emit({action:"modal",params:['close']});
    }
    else if(tipo.toUpperCase() == "LOADING"){
      this.loading.emit({action:"modal",params:['close']});
    }
  }

  pagSite(){
    this.router.navigate(['site']);
  }

}
