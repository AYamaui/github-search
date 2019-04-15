import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private httpClient: HttpClient) { }

  getBasicInfo(repositoryName: string) {
    console.log(repositoryName);
    return this.httpClient.get('https://api.github.com/search/repositories?q=' + repositoryName);
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }
}
