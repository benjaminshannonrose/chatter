import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  userDeleteAccount: FormGroup;
  @Output() closeDeleteClicked: EventEmitter<any> = new EventEmitter();
  deleteAccountError: string;

  constructor( private userService: UserService,
               private formBuilder: FormBuilder,
               private router: Router) { }

  ngOnInit() {
    this.userDeleteAccount = this.formBuilder.group({
      deleteAccountPassword: ['', Validators.required]
    });
  }

  onCloseDeleteAccountForm() {
    this.closeDeleteClicked.emit(false);
  }

  onDeleteAccount() {
    const pw = this.userDeleteAccount.get('deleteAccountPassword').value;
    this.userService.doReauthenticateUser(pw)
      .then( () => {
        this.userService.doDeleteAccount()
          .then( () => {
            alert('Account deleted!');
            this.router.navigate(['/message-board']);
          }).catch( (error) => {
            this.deleteAccountError = error;
        });
      }).catch( (error) => {
      this.deleteAccountError = 'Password entered incorrect';
    });
  }
}
