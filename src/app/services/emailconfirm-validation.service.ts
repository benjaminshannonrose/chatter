import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class EmailConfirmValidationService {

  constructor() { }

  public matchEmail(ac: AbstractControl) {
    const email = ac.get('email').value;
    const confirmEmail = ac.get('emailConfirm').value;

    if (email != confirmEmail) {
      ac.get('emailConfirm').setErrors( {matchEmail: true});
    } else {
      return null;
    }
  }

}
