export class Issue {

  constructor(
    public url: string,
    public id: number,
    public title: string,
    public userUrl: string,
    public state: string,
    public createdAt: Date,
    public updatedAt: Date,
    public userLogin: string,
    public description: string,
    public userAvatarUrl: string
  ) {}
}
