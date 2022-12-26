import { Component, OnInit } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  title = 'Page not Found';

  wandUrl = environment.wandUrl;

  constructor() { }

  ngOnInit() {
  }

}
