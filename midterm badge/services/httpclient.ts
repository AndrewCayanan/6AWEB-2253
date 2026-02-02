import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Posts } from './posts.model';
import { Comments } from './comments.model';

@Injectable({
  providedIn: 'root',
})
export class Httpclient {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  getPostsRemotely(): Observable<Posts[]> {
    const cachedPosts = localStorage.getItem('posts');

    if (cachedPosts) {
      return of(JSON.parse(cachedPosts));
    }

    return this.http.get<Posts[]>(this.postsUrl).pipe(
      tap(posts => localStorage.setItem('posts', JSON.stringify(posts)))
    );
  }

  getCommentsRemotely(): Observable<Comments[]> {
    const cachedComments = localStorage.getItem('comments');

    if (cachedComments) {
      return of(JSON.parse(cachedComments));
    }

    return this.http.get<Comments[]>(this.commentsUrl).pipe(
      tap((comments) => localStorage.setItem('comments', JSON.stringify(comments)))
    );
  }
}
