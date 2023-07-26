export class Card {
  public origin: string;
  public target: string;
  public flipped: boolean;
  public category: string;
  public thrownIntoBucket: boolean;

  constructor(
    origin: string,
    target: string,
    flipped = false,
    category: string,
    thrownIntoBucket = false
  ) {
    this.origin = origin;
    this.target = target;
    this.flipped = flipped;
    this.category = category;
    this.thrownIntoBucket = thrownIntoBucket;
  }
}
