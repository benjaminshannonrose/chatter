import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordConfirmValidationService} from '../services/passwordconfirm-validation.service';
import {EmailConfirmValidationService} from '../services/emailconfirm-validation.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  signupError: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private pwcvs: PasswordConfirmValidationService,
              private ecvs: EmailConfirmValidationService,
              private router: Router) { }

  ngOnInit() {
    this.signUp = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: [this.pwcvs.matchPassword,
        this.ecvs.matchEmail]
    });
  }

  onCreateUser() {
    const username: string = this.signUp.get('username').value;
    const email: string  = this.signUp.get('email').value;
    const password: string  = this.signUp.get('password').value;
    this.userService.doCreateUser(email, password)
      .then(() => {
        this.userService.doUpdateUserInfo(username);
        this.userService.doSetAuthPersistence()
          .then( () => {
            this.router.navigate(['/message-board']);
          }).catch( (error) => {
            this.signupError = error;
        });
      })
      .catch((error) => {
        this.signupError = 'Email belongs to an existing account';
        console.log(error);
      });
  }

}
