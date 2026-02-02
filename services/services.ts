import { Component, signal } from '@angular/core';
import { Httpclient } from './httpclient';
import { Posts } from './posts.model';
import { Comments } from './comments.model';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})

export class Services {
  httpposts: Posts[] = [];
  httpcomments: Comments[] = [];

  constructor(private http: Httpclient) {}

  ngOnInit() {
    this.http.getPostsRemotely().subscribe((data: Posts[]) => {
      this.httpposts = data;
    });
    this.http.getCommentsRemotely().subscribe((data: Comments[]) => {
      this.httpcomments = data;
    });
  }
}
