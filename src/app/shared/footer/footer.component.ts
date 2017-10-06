import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'srb-shared-footer',
  templateUrl: './footer.component.html',
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
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
