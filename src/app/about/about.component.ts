import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  wandUrl = environment.wandUrl;
  title = 'About DevenZone';
  
  constructor() {}

  ngOnInit(): void {
    document.title = this.title;
  }

}
