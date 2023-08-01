import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { adminUID, userUID } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserUID: string | null | undefined;
  constructor(private router: Router, private fireAuth: AngularFireAuth) {
    const userUID = localStorage.getItem('token');
    if (!userUID) {
      this.currentUserUID = null;
    } else {
      this.currentUserUID = JSON.parse(userUID);
    }
  }

  googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.fireAuth.signInWithPopup(provider).then(
      (result) => {
        this.currentUserUID = result.user?.uid;
        localStorage.setItem('token', JSON.stringify(this.currentUserUID));
        this.navigate();
      },
      (error) => {
        alert(error);
      }
    );
  }

  logout() {
    this.fireAuth.signOut();
    this.currentUserUID = null;
    localStorage.clear();
    this.navigate();
  }

  navigate() {
    if (!this.currentUserUID) {
      this.router.navigate(['/auth']);
    } else if (this.currentUserUID == adminUID) {
      this.router.navigate(['/admin']);
    } else if (this.currentUserUID == userUID) {
      this.router.navigate(['/user']);
    }
  }

  returnCurrentUserUID() {
    return this.currentUserUID;
  }
}
