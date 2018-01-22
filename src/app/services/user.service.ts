import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserService {
  private updateMade = new Subject<boolean>();

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) { }

  doGetCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  doCreateUser (email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  doSetAuthPersistence() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  doUpdateUserInfo (username: string, update?: boolean) {
    const user = this.doGetCurrentUser();
    const updateObejct = this;
    user.updateProfile({
      displayName: username,
      photoURL: null
    }).then(function(){
      if (update === true) {
        console.log('Username updated');
        updateObejct.doSendUpdateStatus();
      } else {
        console.log('Account created');
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

  doGetUpdateStatus(): Observable<any> {
    return this.updateMade.asObservable();
  }

  doSendUpdateStatus() {
    setTimeout(() => {
      this.updateMade.next(true);
    }, 5);
    setTimeout( () => {
      this.updateMade.next(false);
    }, 2000);
  }

}
