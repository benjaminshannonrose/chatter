import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private isCollapsed: boolean;
  private isLoggedIn: boolean;
  private userDisplayName: string;
  private userEmail: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isCollapsed = true;
    const authObject = this;
    this.userService.afAuth.auth.onAuthStateChanged(function(user) {
      if (user == null) {
        authObject.isLoggedIn = false;
        authObject.userDisplayName = '';
        authObject.userEmail = '';
      } else if (user != null) {
        authObject.isLoggedIn = true;
        authObject.userDisplayName = user.displayName;
        authObject.userEmail = user.email;
      }
    });
  }

  onLogOut() {
    this.isCollapsed = true;
    this.userService.doLogOut();
  }
}
