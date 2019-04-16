import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, pipe, throwError   } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issue } from '../models/issue/issue';

export interface BasicInfo {
  id: string;
  fullName: string;
  url: string;
  description: string;
  forksUrl: string;
  forks: string;
  issuesUrl: string;
  openIssues: string;
  stargazersUrl: string;
  stargazers: string;
  commitsUrl: string;
}


@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getBasicInfo(repositoryName: string): Observable<object> {
    return this.httpClient.get(`https://api.github.com/search/repositories?q=${repositoryName}`).pipe(
      catchError(this.handleError)
    );
  }

  getIssues(repositoryFullName: string): Observable<Issue[]> {
    console.log(`https://api.github.com/search/issues?q=repo:${repositoryFullName}`);

    return this.httpClient.get(`https://api.github.com/search/issues?q=repo:${repositoryFullName}`).pipe(
      map((resp) => {
        return resp['items'].map(item => {
          return new Issue(
              item.url,
              item.id,
              item.title,
              item.user.html_url,
              item.state,
              item.created_at,
              item.updated_at,
              item.user.login,
              item.body,
              item.user.avatar_url
          );
        });
      }),
      catchError(this.handleError)
    );
  }

  // Default error handling for all actions
  private handleError(error) {
    const errorMessage = `An error occurred: ${error}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
