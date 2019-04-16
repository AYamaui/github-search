import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, pipe, throwError   } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issue } from '../../models/issue/issue';
import { BasicInfo } from '../../models/basic-info/basic-info';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getBasicInfo(repositoryName: string): Observable<BasicInfo> {
    console.log(repositoryName);
    return this.httpClient.get(`https://api.github.com/search/repositories?q=${repositoryName}`).pipe(
      map( (resp) => {
        const firstItem = resp['items'][0];

        if (resp['total_count'] === 0 || firstItem.name !== repositoryName) {
          return new BasicInfo('0');
        } else {

          return new BasicInfo(
            resp['total_count'],
            firstItem.id,
            firstItem.full_name,
            firstItem.html_url,
            firstItem.description,
            firstItem.forks_url,
            firstItem.forks_count,
            firstItem.issue_events_url,
            firstItem.open_issues_count,
            firstItem.stargazers_url,
            firstItem.stargazers_count,
            firstItem.commits_url
          );
        }
      }),
      catchError(this.handleError)
    );
  }

  getIssues(repositoryFullName: string, page: number): Observable<any[]> {
    console.log(`https://api.github.com/search/issues?q=repo:${repositoryFullName}`);

    return this.httpClient.get(`https://api.github.com/search/issues?q=repo:${repositoryFullName}
                                &page=${page}&sort=updated&order=desc`).pipe(
      map((resp) => {
        return [resp['items'].map(item => {
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
              item.user.avatar_url,
          );
        }), resp['total_count']];
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
