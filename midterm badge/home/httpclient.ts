import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Comments } from './comments.model';

@Injectable({
  providedIn: 'root',
})
export class Httpclient {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

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
