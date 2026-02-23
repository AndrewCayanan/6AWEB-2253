import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-register',
  imports: [
    DatePipe,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;
  loading = false;

  constructor(private cdr: ChangeDetectorRef) {}

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5),
  });

  onClickSubmit(data: any) {
  if (this.formdata.valid) {
    this.loading = true;
    this.submitted = false; // hide previous results while loading

    // simulate loading
    setTimeout(() => {
      this.loading = false;
      this.submitted = true; // now the @if (submitted) block will render

      // assign values
      this.userName = data.userName;
      this.email = data.email;
      this.password = data.password;
      this.gender = data.gender;
      this.address = data.address;
      this.birthDate = data.birthDate;
      this.angularSkillLevel = data.angularSkillLevel;

      this.cdr.detectChanges();

      console.log('Form Submitted!', this.formdata.value);

    }, 2000); // 2 seconds fake loading
  } else {
    console.log('Form is not valid!');
  }
}
}
