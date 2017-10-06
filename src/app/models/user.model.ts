import { DataObject } from './data-object.model';

export class User extends DataObject {

  public userName: string;
  public email: string;
  public phoneNumber: string;
  public address: string;
  public firstName: string;
  public lastName: string;
  public isActive: boolean;

  constructor() {
    super();
  }
}
