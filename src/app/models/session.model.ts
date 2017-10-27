export class Session{

  public userId: string;
  public name: string;
  public email: string;
  public token: string;

  constructor(source:any) {
    this.userId = source.userId;
    this.name = source.name;
    this.email = source.email;
    this.token = source.token;
  }

}
