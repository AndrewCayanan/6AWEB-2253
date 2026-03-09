import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DecimalPipe, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'booksapp';
  readonly APIUrl = 'http://localhost:5038/api/books/';

  books: any[] = [];

  // ── Add form fields ──
  newBook:   string = '';
  newAuthor: string = '';
  newGenre:  string = '';
  newDesc:   string = '';
  newPrice:  number | null = null;

  // ── Edit form fields ──
  editingBook: any = null;
  editBook:    string = '';
  editAuthor:  string = '';
  editGenre:   string = '';
  editDesc:    string = '';
  editPrice:   number | null = null;

  // ── Toast ──
  toastVisible = false;
  toastMessage = '';
  private toastTimer: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  get totalValue(): number {
    return this.books.reduce((sum: number, b: any) => sum + (b.price ?? 0), 0);
  }

  // ════════════════════════════
  //  READ
  // ════════════════════════════
  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe({
      next: (data) => { this.books = data as any[]; },
      error: (err)  => { console.error('GetBooks failed:', err); }
    });
  }

  // ════════════════════════════
  //  CREATE
  // ════════════════════════════
  addBook() {
    if (!this.newBook.trim()) {
      this.showToast('Please enter a book title');
      return;
    }

    const formData = new FormData();
    formData.append('title',       this.newBook.trim());
    formData.append('author',      this.newAuthor.trim());
    formData.append('genre',       this.newGenre.trim());
    formData.append('description', this.newDesc.trim());   // API maps this → desc
    formData.append('price',       (this.newPrice ?? 0).toString());

    this.http.post(this.APIUrl + 'AddBook', formData).subscribe({
      next: () => {
        this.showToast('Book added to collection');
        this.clearAddForm();
        this.refreshBooks();
      },
      error: (err) => {
        console.error('AddBook failed:', err);
        this.showToast('Failed to add book');
      }
    });
  }

  // ════════════════════════════
  //  UPDATE — open edit panel
  // ════════════════════════════
  startEdit(book: any) {
    this.editingBook = book;
    this.editBook   = book.title  ?? '';
    this.editAuthor = book.author ?? '';
    this.editGenre  = book.genre  ?? '';
    this.editDesc   = book.desc   ?? '';   // stored as 'desc' in MongoDB
    this.editPrice  = book.price  ?? null;
  }

  // ════════════════════════════
  //  UPDATE — save changes
  // ════════════════════════════
  saveEdit() {
    if (!this.editBook.trim()) {
      this.showToast('Title cannot be empty');
      return;
    }

    const id = this.editingBook.id;   // string ID from MongoDB

    const formData = new FormData();
    formData.append('title',       this.editBook.trim());
    formData.append('author',      this.editAuthor.trim());
    formData.append('genre',       this.editGenre.trim());
    formData.append('description', this.editDesc.trim());  // API maps this → desc
    formData.append('price',       (this.editPrice ?? 0).toString());

    this.http.put(this.APIUrl + 'UpdateBook/' + id, formData).subscribe({
      next: () => {
        this.showToast('Book updated successfully');
        this.cancelEdit();
        this.refreshBooks();
      },
      error: (err) => {
        console.error('UpdateBook failed:', err);
        this.showToast('Failed to update book');
      }
    });
  }

  // ════════════════════════════
  //  UPDATE — cancel editing
  // ════════════════════════════
  cancelEdit() {
    this.editingBook = null;
    this.editBook = this.editAuthor = this.editGenre = this.editDesc = '';
    this.editPrice = null;
  }

  // ════════════════════════════
  //  DELETE
  // ════════════════════════════
  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe({
      next: () => {
        this.showToast('Book removed');
        if (this.editingBook?.id === id) this.cancelEdit();
        this.refreshBooks();
      },
      error: (err) => {
        console.error('DeleteBook failed:', err);
        this.showToast('Failed to delete book');
      }
    });
  }

  // ════════════════════════════
  //  HELPERS
  // ════════════════════════════
  private clearAddForm() {
    this.newBook = this.newAuthor = this.newGenre = this.newDesc = '';
    this.newPrice = null;
  }

  private showToast(msg: string) {
    this.toastMessage = msg;
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible = false, 2600);
  }
}
