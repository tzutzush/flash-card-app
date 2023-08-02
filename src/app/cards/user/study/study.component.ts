import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit, OnDestroy {
  private cards: Card[] = [];
  private currentIndex = 0;
  private category = '';
  private categorySubscription!: Subscription;
  public currentCard: Card | null = null;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.cardService.category.subscribe((category) => {
      this.category = category;
    });
    this.cards = this.cardService.getCardsByCategory(this.category);
    this.currentCard = this.cards[this.currentIndex];
  }

  ngOnDestroy(): void {
    if (this.categorySubscription !== undefined) {
      this.categorySubscription.unsubscribe();
    }
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
