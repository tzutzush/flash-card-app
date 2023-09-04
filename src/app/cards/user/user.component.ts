import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(private router: Router) {}

  goToCorrespondingComponent(category: string, page: string) {
    if (page === 'study') {
      this.router.navigate([`study/${category}/0`]);
    } else if (page === 'inquiry') {
      this.router.navigate([`inquiry/${category}`]);
    }
  }
}
