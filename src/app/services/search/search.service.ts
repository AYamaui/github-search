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

  // Makes a HTTP request to the Github API to retrieve the basic info of the repository
  // params:
  //  repositoryName: string:
  //   Repository name
  // return: BasicInfo
  //  A BasicInfo object containing the basic info of the repository
  getBasicInfo(repositoryName: string): Observable<BasicInfo> {

    return this.httpClient.get(`https://api.github.com/search/repositories?q=${repositoryName}`).pipe(
      map( (resp) => {
        const firstItem = resp['items'][0];

        if (Number(resp['total_count']) === 0 || firstItem.name !== repositoryName) {
          return new BasicInfo(0);
        } else {

          return new BasicInfo(
            Number(resp['total_count']),
            Number(firstItem.id),
            firstItem.full_name,
            firstItem.html_url,
            firstItem.description,
            firstItem.forks_url,
            Number(firstItem.forks_count),
            firstItem.issue_events_url,
            Number(firstItem.open_issues_count),
            firstItem.stargazers_url,
            Number(firstItem.stargazers_count),
            firstItem.commits_url,
            firstItem.owner.login,
            firstItem.name
          );
        }
      }),
      catchError(this.handleError)
    );
  }

  // Makes a HTTP request to the Github API to retrieve the issues
  // params:
  //  repositoryFullName: string:
  //   Repository full name (owner/repository)
  //  page: int
  //   The next page of results to bring (every page contains 30 items)
  // return: [Issue[], total_count]
  //  An array containing the issues array and the total number of issues in the repository
  getIssues(repositoryFullName: string, page: number): Observable<any[]> {

    return this.httpClient.get(`https://api.github.com/search/issues?q=repo:${repositoryFullName}
                                &page=${page}&sort=updated&order=desc`).pipe(
      map((resp) => {
        return [resp['items'].map(item => {
          return new Issue(
              item.url,
              Number(item.id),
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
    const errorMessage = `An error occurred: ${error.error.message}`;
    return throwError(errorMessage);
  }
}
