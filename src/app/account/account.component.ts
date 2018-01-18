import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  showChangeUsernameForm: boolean;
  showChangeEmailForm: boolean;
  showChangePasswordForm: boolean;
  showDeleteAccountForm: boolean;

  constructor() { }

  ngOnInit() {
    this.showChangePasswordForm = false;
    this.showDeleteAccountForm = false;
    this.showChangeEmailForm = false;
  }

  onToggleChangeUsernameForm(bool: boolean) {
    this.showChangeUsernameForm = bool;
  }

  onToggleChangeEmailForm(bool: boolean) {
    this.showChangeEmailForm = bool;
  }

  onToggleChangePasswordForm(bool: boolean) {
    this.showChangePasswordForm = bool;
  }

  onToggleDeleteAccountForm(bool: boolean) {
    this.showDeleteAccountForm = bool;
  }

}
