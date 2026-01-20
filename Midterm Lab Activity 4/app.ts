import { Component, signal } from '@angular/core';
import { email } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { Product } from './product';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public employees: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  }[] = [];

  public products: {
    id: string;
    product: string;
    description: string;
    price: number;
  }[] = [];

  constructor(
    private _employeeService: Employee, private _productService: Product) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.products = this._productService.getProducts();
  }
}


