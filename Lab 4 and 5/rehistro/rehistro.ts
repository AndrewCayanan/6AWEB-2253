import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

// ─── Custom Validators ────────────────────────────────────────────────────────

function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';
    if (!value) return null;
    if (!/^[A-Za-z]/.test(value))       return { startsWithLetter: true };
    if (!/^[A-Za-z0-9]+$/.test(value))  return { alphanumericOnly: true };
    if (value.length < 8)               return { minLength: true };
    return null;
  };
}

function birthYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const year = new Date(value).getFullYear();
    if (year > 2006) return { tooYoung: true };
    return null;
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-rehistro',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './rehistro.html',
  styleUrl: './rehistro.css',
})
export class Rehistro {
  darkMode = true;
  submitted = false;
  loading = false;
  maxDate = new Date(2006, 11, 31);

  result: any = {};

  formdata: FormGroup = new FormGroup({
    fullName:          new FormControl('', [Validators.required, Validators.minLength(2)]),
    email:             new FormControl('', [Validators.required, Validators.email]),
    password:          new FormControl('', [Validators.required, strongPasswordValidator()]),
    birthDate:         new FormControl('', [Validators.required, birthYearValidator()]),
    gender:            new FormControl('', [Validators.required]),
    address:           new FormControl(''),
    angularSkillLevel: new FormControl(5),
  });

  constructor(private cdr: ChangeDetectorRef) {}

  get passwordErrors(): string {
    const ctrl = this.formdata.controls['password'];
    if (!ctrl.touched || ctrl.valid) return '';
    if (ctrl.hasError('required'))         return 'Password is required.';
    if (ctrl.hasError('startsWithLetter')) return 'Must start with a letter.';
    if (ctrl.hasError('alphanumericOnly')) return 'Only letters and numbers are allowed.';
    if (ctrl.hasError('minLength'))        return 'Must be at least 8 characters long.';
    return '';
  }

  get birthDateErrors(): string {
    const ctrl = this.formdata.controls['birthDate'];
    if (!ctrl.touched || ctrl.valid) return '';
    if (ctrl.hasError('required'))  return 'Birth date is required.';
    if (ctrl.hasError('tooYoung'))  return 'You must be born in 2006 or earlier.';
    return '';
  }

  onSubmit(): void {
    if (this.formdata.valid) {
      this.loading = true;
      this.submitted = false;

      setTimeout(() => {
        this.loading = false;
        this.submitted = true;
        this.result = { ...this.formdata.value };
        this.cdr.detectChanges();
      }, 2000);
    } else {
      this.formdata.markAllAsTouched();
    }
  }
}
