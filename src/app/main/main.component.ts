import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularFire2/database';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

lstVersoes: FirebaseListObservable<any>;

  constructor(public afDatabase: AngularFireDatabase) { 

    this.lstVersoes = this.afDatabase.list('Versoes',{query: {
      orderByChild: 'versao'
    }});
  }

}
