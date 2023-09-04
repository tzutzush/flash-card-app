import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    this.currentIndex = this.route.snapshot.params['index'];
    this.cards = this.cardService.getCardsByCategory(this.category);
    this.currentCard = this.cards[this.currentIndex];
  }

  onNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.cards.length) {
      this.currentIndex = 0;
    }
    this.currentCard = this.cards[this.currentIndex];
    this.router.navigate(['study', this.category, this.currentIndex]);
  }

  navigateBack() {
    this.router.navigate(['user']);
  }
}
