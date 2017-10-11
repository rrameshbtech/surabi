import { Injectable } from '@angular/core';
import { MatSnackBar, 
  MatSnackBarConfig} from '@angular/material';

@Injectable()
export class ToastService {
  defaultConfig:MatSnackBarConfig;
  defaultAction = 'OK';

  constructor(private snackBar: MatSnackBar){

    this.defaultConfig = new MatSnackBarConfig();
    this.defaultConfig.duration = 0;
    this.defaultConfig.verticalPosition = 'top';
    this.defaultConfig.horizontalPosition = 'right';
    this.defaultConfig.direction = 'ltr';

  }

  show(message:string, action?:string, config?: MatSnackBarConfig):any{
    action = action ? action : this.defaultAction;
    return this.snackBar.open(message, action, this.buildConfig(config));
  }

  buildConfig(config:MatSnackBarConfig) {
    config = config ? config : new MatSnackBarConfig();

    for(const configField in this.defaultConfig) {
      if(this.defaultConfig.hasOwnProperty(configField)) {
        config[configField] = this.defaultConfig[configField];
      }
    }

    return config;
  }
}