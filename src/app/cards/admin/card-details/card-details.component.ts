import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card-service.service';
import { Card } from '../../card.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  currentCard: Card | null = null;
  creating = false;
  cardForm = new FormGroup({
    origin: new FormControl('', [Validators.required]),
    target: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.selectedCard.subscribe((card: Card) => {
      this.currentCard = card;
    });
  }

  onCreateCard() {
    this.creating = true;
  }

  onSave() {
    if (
      this.currentCard &&
      this.cardForm.value.origin &&
      this.cardForm.value.target
    ) {
      this.cardService.editCard(
        this.currentCard,
        this.cardForm.value.origin,
        this.cardForm.value.target
      );
    }
    this.currentCard = null;
    this.cardForm.reset();
  }

  onCreate() {
    if (
      this.cardForm.value.origin &&
      this.cardForm.value.target &&
      this.cardForm.value.category
    ) {
      this.cardService.createCard(
        this.cardForm.value.origin,
        this.cardForm.value.target,
        this.cardForm.value.category
      );
    }
    this.cardForm.reset();
  }

  onCancel() {
    this.currentCard = null;
    this.creating = false;
    this.cardForm.reset();
  }
}
