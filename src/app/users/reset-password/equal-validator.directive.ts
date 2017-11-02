import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: `[validateEqual][formControlName],[validateEqual] 
    [formControl],[validateEqual][ngModel]`,
  providers: [{
    provide: NG_VALIDATORS, useExisting: forwardRef(() =>
      EqualValiadtorDirective), multi: true
  }]
})
export class EqualValiadtorDirective implements Validator {

  constructor( @Attribute('validateEqual') public validateEqual: string
    , @Attribute('reverse') public reverse: boolean) { }

  validate(selfControl: AbstractControl): { [key: string]: any } {
    
    let selfValue = selfControl.value;
    let comparingControl = selfControl.root.get(this.validateEqual);

    if(!comparingControl) {
      return;
    }

    if (selfValue !== comparingControl.value) {
      if (!this.reverse) {
        return {
          validateEqual: true
        };
      } else {
        comparingControl.setErrors({ validateEqual: true });
        return;
      }
    }

    if (this.reverse) {
      delete comparingControl.errors['validateEqual'];
      if (!Object.keys(comparingControl.errors).length) {
        comparingControl.setErrors(null);
      }
    }
    return null;
  }
}
