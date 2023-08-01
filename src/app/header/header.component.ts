import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { adminUID } from '../auth/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public adminPage = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.returnCurrentUserUID() === adminUID) {
      this.adminPage = true;
    } else {
      this.adminPage = false;
    }
  }

  logOut() {
    this.authService.logout();
  }
}
