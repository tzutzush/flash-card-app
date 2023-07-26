import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.fireAuth.signInWithPopup(provider).then(
      (result) => {
        this.router.navigate(['/user']);
        localStorage.setItem('token', JSON.stringify(result.user?.uid));
      },
      (error) => {
        alert(error);
      }
    );
  }

  logout() {
    this.fireAuth.signOut();
    this.router.navigate(['/auth']);
  }
}
