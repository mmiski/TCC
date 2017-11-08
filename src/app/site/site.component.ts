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

  

  pagContato(){

    this.router.navigate(['contato']);
  }

}
