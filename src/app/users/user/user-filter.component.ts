import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserFilterDetails } from './user-filter-details.model';

@Component({
  selector: 'srb-user-filter',
  templateUrl: './user-filter.component.html',
  styles: []
})
export class UserFilterComponent implements OnInit {

  filterParams:UserFilterDetails = new UserFilterDetails();
  filterChange:BehaviorSubject<UserFilterDetails> = new BehaviorSubject<UserFilterDetails>(this.filterParams);
  constructor() { }

  ngOnInit() {
  }

  filter(){
    this.filterChange.next(this.filterParams);
  }

  reset(){
    this.filterParams = new UserFilterDetails();
    this.filter();
  }
}
