import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const email: string = this.login.get('email').value;
    const password: string = this.login.get('password').value;
    this.userService.doLogin(email, password)
      .then(() => {
        this.userService.doSetAuthPersistence()
          .then( () => {
            this.router.navigate(['/message-board']);
          }).catch( (error) => {
            this.errorMessage = error;
        });
    }).catch((error) => {
        console.log(error);
        this.errorMessage = 'Invalid login credentials';
    });
  }

}
