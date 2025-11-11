import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  wandUrl = environment.wandUrl;
  title = 'About DevenZone';
  
  constructor(private location: Location ) {}

  ngOnInit(): void {
    document.title = this.title;
  }

  goBack(): void {
    this.location.historyGo(-1);
  }

}
