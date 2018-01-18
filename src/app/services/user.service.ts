import {EventEmitter, Injectable, Output} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {User} from 'firebase';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) { }

  doGetCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  doCreateUser (email: string, password: string, username: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  doUpdateUserInfo (username: string, update?: boolean) {
    const user = this.doGetCurrentUser();
    user.updateProfile({
      displayName: username,
      photoURL: null
    }).then(function(){
      if (update === true) {
        alert('Username updated successfully!');
      } else {
        alert('Account created - Welcome!');
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  doLogin (email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  doLogOut () {
    return this.afAuth.auth.signOut().then( () => {
      this.router.navigate(['/login']);
    });
  }

  doUpdateUserEmail(newEmail: string) {
    const user = this.doGetCurrentUser();
    return user.updateEmail(newEmail);
  }

  doUpdateUserPassword(newPW: string) {
    const user = this.doGetCurrentUser();
    return user.updatePassword(newPW);
  }

  doDeleteAccount() {
    const user = this.doGetCurrentUser();
    return user.delete();
  }

  doReauthenticateUser(pw) {
    const user = this.doGetCurrentUser();
    return user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, pw));
  }

}
