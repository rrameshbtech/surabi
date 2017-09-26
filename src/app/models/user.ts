import { DataObject } from './dataObject';

export class User extends DataObject {

  public userName: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public isActive: boolean;

  constructor() {
    super();
  }
}