import { Httpclient } from './httpclient';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user.model';
import { Comment } from './comments.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng-httpclient-demo');
  httpusers: User[] = [];
  httpcomments: Comment[] = [];

  constructor(private http: Httpclient) {}

  ngOnInit() {
    this.http.getUsersRemotely().subscribe((data: User[]) => {
      this.httpusers = data;
    });
    this.http.getCommentsRemotely().subscribe((data: Comment[]) => {
      this.httpcomments = data;
    });
  }
}
