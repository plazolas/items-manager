import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 public wandUrl = '';
  constructor() {
    this.wandUrl = environment.https + '://' + environment.domain + ':' + environment.backEndPoint;
  }

  ngOnInit() {
  }

}
