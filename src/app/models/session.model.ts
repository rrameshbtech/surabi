import { DataObject } from './data-object.model';

export class Session extends DataObject {

  public userName: string;
  public email: string;
  public phoneNumber: string;  
  public firstName: string;
  public lastName: string;
  public userId: string;

  constructor() {
    super();
  }
}
