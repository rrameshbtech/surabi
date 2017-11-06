import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'srb-public-footer',
  templateUrl: './public-footer.component.html',
  styles: [`.footer {
      text-align: center;
      background-color: white;
      font-size: .8em;
      padding-top: 10px;
      border-top: #bbb 1px solid;
      margin-top: 10px;
    };
    `
  ]
})
export class PublicFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
