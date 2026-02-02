import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, DatePipe, UpperCasePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  currentDate: Date = new Date();
}
