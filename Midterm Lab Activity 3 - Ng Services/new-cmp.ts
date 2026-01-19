import { Myservice } from './../myservice';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-cmp',
  standalone: true,
  imports: [],
  templateUrl: './new-cmp.html',
  styleUrl: './new-cmp.css',
})
export class NewCmp {
  todaydate;
  newcomponent = 'Entered in new component';
  componentproperty;
  constructor(private Myservice: Myservice) {
    this.todaydate = this.Myservice.showTodayDate();
    this.Myservice.serviceproperty = 'Component Created';
    this.componentproperty = this.Myservice.serviceproperty;
  }
}
