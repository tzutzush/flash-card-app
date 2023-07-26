import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public winRef: unknown;
  constructor(public authService: AuthService) {}

  logInWithGoogle() {
    this.authService.googleSignIn();
  }
}
