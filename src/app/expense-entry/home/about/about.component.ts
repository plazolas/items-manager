import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public url = ''
  public wandUrl = ''
  public javaUrl = ''
  
  constructor() {
    this.url = environment.https + '://' + environment.domain;
    this.wandUrl = this.url + ':' + environment.phpEndPoint + '/wand';
    this.javaUrl = this.url + ':' + environment.backEndPoint;
  }

  ngOnInit(): void {
  }

}
