export class BasicInfo {

  constructor(
    public repositories: number,
    public id: number = null,
    public fullName: string = null,
    public url: string = null,
    public description: string = null,
    public forksUrl: string = null,
    public forks: number = null,
    public issuesUrl: string = null,
    public openIssues: number = null,
    public stargazersUrl: string = null,
    public stargazers: number = null,
    public commitsUrl: string = null,
    public owner: string = null,
    public name: string = null
  ) {}
}
