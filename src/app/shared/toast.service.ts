import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';

export const ERROR_TOASTER_CLASS = 'error-toaster';
export const COMMON_TOASTER_CLASS = 'toaster';

@Injectable()
export class ToastService {
  defaultConfig: MatSnackBarConfig;
  defaultAction = 'OK';

  constructor(private snackBar: MatSnackBar) {

    this.defaultConfig = new MatSnackBarConfig();
    this.defaultConfig.duration = 5000;
    this.defaultConfig.verticalPosition = 'top';
    this.defaultConfig.horizontalPosition = 'right';
    this.defaultConfig.direction = 'ltr'
    this.defaultConfig.extraClasses = [COMMON_TOASTER_CLASS];

  }

  show(message: string, action?: string, config?: MatSnackBarConfig): any {
    action = action ? action : this.defaultAction;
    return this.snackBar.open(message, action, this.buildConfig(config));
  }

  error(message: string): any {
    const errorConfig = new MatSnackBarConfig();
    errorConfig.extraClasses = [ERROR_TOASTER_CLASS];

    return this.show(message, null, errorConfig);
  }

  buildConfig(config: MatSnackBarConfig) {
    config = config ? config : new MatSnackBarConfig();

    for (const configField in this.defaultConfig) {
      if (this.defaultConfig.hasOwnProperty(configField)) {
        if (config[configField] instanceof Array) {
          config[configField] = config[configField].concat(this.defaultConfig[configField]);
        } else {
          config[configField] = this.defaultConfig[configField];
        }
      }
    }

    return config;
  }
}