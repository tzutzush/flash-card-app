export class Card {
  public origin: string;
  public target: string;
  public flipped: boolean;
  public category: string;

  constructor(
    origin: string,
    target: string,
    flipped = false,
    category: string
  ) {
    this.origin = origin;
    this.target = target;
    this.flipped = flipped;
    this.category = category;
  }
}
