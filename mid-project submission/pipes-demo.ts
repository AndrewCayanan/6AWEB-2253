import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, JsonPipe, LowerCasePipe, PercentPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-pipes-demo',
  imports: [AsyncPipe, JsonPipe, PercentPipe, SlicePipe, CurrencyPipe, DatePipe, UpperCasePipe, LowerCasePipe, DecimalPipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})
export class PipesDemo {
   presentDate = new Date();
   firstName = 'Andrew';
   lastName = 'Cayanan';
   fullname = `${this.firstName} ${this.lastName}`;
   price = 1234.56;
   fruits = ['Apple', 'Banana', 'Orange', 'Mango', "Pineapple", "Pomegranate"];
   decimalNum1 = 3.14159265359;
   decimalNum2 = 2.71828182846;
   percent1: number = 0.8534;
   percent2: number = 0.425;
   user = {
    name: 'Alice',
    age: 30,
    roles: ['admin', 'editor']
  };
  currentTime$ = interval(1000).pipe(map(() => new Date()));
}

