import { Injectable } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class PasswordConfirmValidationService {

  constructor() { }

  public matchPassword(ac: AbstractControl) {
    const password = ac.get('password').value;
    const confirmPassword = ac.get('passwordConfirm').value;

    if (password != confirmPassword) {
      ac.get('passwordConfirm').setErrors( {matchPassword: true});
    } else {
      return null;
    }
  }

}
