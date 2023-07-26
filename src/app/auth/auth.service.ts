import { Injectable } from '@angular/core';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { adminUID } from './constants';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  authLogin(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user?.uid === adminUID) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
