import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  userPasswordChange: FormGroup;
  @Output() closeChangePasswordClicked: EventEmitter<any> = new EventEmitter();
  passwordChangeError: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userPasswordChange = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onClosePasswordForm() {
    this.closeChangePasswordClicked.emit(false);
  }

  onUpdatePassword() {
    const oldPW = this.userPasswordChange.get('oldPassword').value;
    const newPW = this.userPasswordChange.get('newPassword').value;
    this.userService.doReauthenticateUser(oldPW)
      .then( () => {
        this.userService.doUpdateUserPassword(newPW)
          .then( () => {
            alert('Password changed successfully!');
            this.onClosePasswordForm();
          }).catch( (error) => {
            this.passwordChangeError = error;
        });
      }).catch( (error) => {
        this.passwordChangeError = 'Current password incorrect';
    });
  }

}
