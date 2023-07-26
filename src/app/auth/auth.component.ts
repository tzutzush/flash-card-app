import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { WindowService } from './window.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public winRef: unknown;
  constructor(
    public authService: AuthService,
    private windowRef: WindowService,
    private formBuilder: FormBuilder
  ) {
    this.winRef = windowRef;
  }
}
