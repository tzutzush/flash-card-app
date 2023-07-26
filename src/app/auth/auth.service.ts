import { Injectable } from '@angular/core';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
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
        this.router.navigate(['categories']);
        console.log(
          `You have successfully logged in ${result.user?.displayName}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
