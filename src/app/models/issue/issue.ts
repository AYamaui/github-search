export class Issue {

  constructor(
    public url: string,
    public id: string,
    public title: string,
    public userUrl: string,
    public state: string,
    public createdAt: string,
    public updatedAt: string,
    public userLogin: string,
    public description: string,
    public userAvatarUrl: string
  ) {}
}
