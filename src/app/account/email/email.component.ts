import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  userChangeEmail: FormGroup;
  @Output() closeChangeEmailClicked: EventEmitter<any> = new EventEmitter();
  emailChangeError: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userChangeEmail = this.formBuilder.group( {
      changeEmailPassword: ['', Validators.required],
      newEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onCloseChangeEmailForm() {
    this.closeChangeEmailClicked.emit(false);
  }

  onChangeEmail() {
    const pw = this.userChangeEmail.get('changeEmailPassword').value;
    const newEmail = this.userChangeEmail.get('newEmail').value;
    this.userService.doReauthenticateUser(pw)
      .then( () => {
        this.userService.doUpdateUserEmail(newEmail)
          .then( () => {
            this.userService.doSendUpdateStatus();
            this.onCloseChangeEmailForm();
          }).catch( (error) => {
            this.emailChangeError = 'Email belongs to an existing account';
        });
      }).catch( (error) => {
        this.emailChangeError = 'Incorrect password';
    });
  }
}
