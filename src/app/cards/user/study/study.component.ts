import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  private cards: Card[] = [];
  private currentIndex = 0;
  private category = '';
  public currentCard: Card | null = null;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.cardService.category.subscribe((category) => {
      this.category = category;
    });
    this.cards = this.cardService.getCardsByCategory(this.category);
    this.currentCard = this.cards[this.currentIndex];
  }

  onNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.currentCard = this.cards[this.currentIndex];
  }

  navigateBack() {
    this.router.navigate(['user']);
  }
}
