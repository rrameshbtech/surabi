export class Session{

  public userName: string;
  public email: string;
  public token: string;

  constructor(source:any) {
    this.userName = source.userName;
    this.email = source.email;
    this.token = source.token;
  }

  isValid():boolean{
    return this.userName != null && this.token != null;
  }

}
