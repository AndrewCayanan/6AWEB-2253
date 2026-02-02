import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Angular HttpClient
import { Posts } from './posts.model';
import { Comments } from './comments.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [TitleCasePipe],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
})
export class Services implements OnInit {

  httpposts: Posts[] = [];
  httpcomments: Comments[] = [];

  filtered: Posts[] = [];

  currentPage = 1;
  pageSize = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch posts
    this.http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.httpposts = data;
        this.filtered = data;
      });

    // Fetch comments
    this.http.get<Comments[]>('https://jsonplaceholder.typicode.com/comments')
      .subscribe(data => {
        this.httpcomments = data;
      });
  }

  // Filter posts by search input
search(query: string): void {
    const text = query.toLowerCase();
    this.filtered = this.httpposts.filter(post =>
      post.title.toLowerCase().includes(text) ||
      post.body.toLowerCase().includes(text)
    );
  }

  // Paginated comments
  get paginatedComments(): Comments[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.httpcomments.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.httpcomments.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
