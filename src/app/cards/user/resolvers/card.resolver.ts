import { ResolveFn } from '@angular/router';
import { CardService } from '../../card-service.service';
import { inject } from '@angular/core';

export const cardResolver: ResolveFn<boolean> = () => {
  const cardService = inject(CardService);
  return cardService.initCards();
};
