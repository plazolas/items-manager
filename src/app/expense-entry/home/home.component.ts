import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 public url = ''
 public wandUrl = ''
 public javaUrl = ''
  constructor() {
    this.url = environment.https + '://' + environment.domain;
    this.wandUrl = environment.https + '://' + environment.domain + ':' + environment.phpEndPoint + '/wand';
    this.javaUrl = this.url + ':' + environment.backEndPoint;
  }

  ngOnInit() {
  }

}
