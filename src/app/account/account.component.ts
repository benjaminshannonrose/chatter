import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

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
  showUpdateMade: boolean;
  updateSubscription: Subscription;

  constructor( private userService: UserService) {
    this.updateSubscription = this.userService.doGetUpdateStatus().subscribe(
      status => {
        this.showUpdateMade = status;
      });
  }

  ngOnInit() {
    this.showChangeUsernameForm = false;
    this.showChangePasswordForm = false;
    this.showDeleteAccountForm = false;
    this.showChangeEmailForm = false;
    this.showUpdateMade = false;
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
