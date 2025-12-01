import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isStaticNoteVisible = true;
  isParagraphVisible = false;
  monthNameStatic = 'Jan';
  monthNameDynamic = 'Jan';

  showNote() {
    this.isStaticNoteVisible = true;
  }
  hideNote() {
    this.isStaticNoteVisible = false;
  }
  toggleNote() {
    this.isParagraphVisible = !this.isParagraphVisible;
  }
}
