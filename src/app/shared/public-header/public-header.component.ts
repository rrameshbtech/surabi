import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'srb-public-header',
  templateUrl: './public-header.component.html',
  styles: [
    ` //Header Logo
      .logo {
        padding: 5px;
      }
      .logo span {
          font-family: 'Audiowide', cursive;
          font-size: 2em;
          margin-left: 5px;
        }`
  ]
})
export class PublicHeaderComponent implements OnInit {
  userMenu: any;
  baseUrl= '';
  constructor() {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
  }

}
