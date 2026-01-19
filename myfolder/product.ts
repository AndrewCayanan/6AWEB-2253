import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Product {
  getProducts() {
    return [
      {
        id: 'P-101',
        product: 'Logitech Mouse',
        Description: '6 Button Mechanical Mouse',
        Price: 899.00
      },
      {
        id: 'P-102',
        product: 'JBL BT Speaker',
        Description: 'Waterproof Radio 360 Surround',
        Price: 1099.00
      },
      {
        id: 'P-103',
        product: 'Mechanical KeyBoard',
        Description: 'Hot-swappable RGB Backlit',
        Price: 2395.00
      },
      {
        id: 'P-104',
        product: 'Oculus Meta',
        Description: 'All-in-one Gaming Headset',
        Price: 22450.00
      },
    ];
  }
}
