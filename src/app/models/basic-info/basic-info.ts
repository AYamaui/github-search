export class BasicInfo {

  constructor(
    public repositories: string,
    public id: string = null,
    public fullName: string = null,
    public url: string = null,
    public description: string = null,
    public forksUrl: string = null,
    public forks: string = null,
    public issuesUrl: string = null,
    public openIssues: string = null,
    public stargazersUrl: string = null,
    public stargazers: string = null,
    public commitsUrl: string = null
  ) {}
}
