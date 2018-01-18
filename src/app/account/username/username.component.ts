import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  currentUsername = this.userService.doGetCurrentUser().displayName;
  userChangeUsername: FormGroup;
  @Output() closeChangeUsernameClicked: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userChangeUsername = this.formBuilder.group( {
      newUsername: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCloseChangeUsernameForm() {
    this.closeChangeUsernameClicked.emit(false);
  }

  onChangeUsername() {
    const newUsername = this.userChangeUsername.get('newUsername').value;
    this.userService.doUpdateUserInfo(newUsername, true);
    this.onCloseChangeUsernameForm();
  }

}
