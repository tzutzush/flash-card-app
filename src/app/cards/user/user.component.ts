import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(private router: Router, private cardService: CardService) {}

  goToCorrespondingComponent(category: string, page: string) {
    this.cardService.category.next(category);
    if (page === 'study') {
      this.router.navigate(['study']);
    } else if (page === 'inquiry') {
      this.router.navigate(['inquiry']);
    }
  }
}
