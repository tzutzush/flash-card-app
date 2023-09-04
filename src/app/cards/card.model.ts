export class Card {
  public id: string;
  public origin: string;
  public target: string;
  public flipped: boolean;
  public category: string;
  public thrownIntoBucket: boolean;

  constructor(
    id: string,
    origin: string,
    target: string,
    flipped = false,
    category: string,
    thrownIntoBucket = false
  ) {
    this.id = id;
    this.origin = origin;
    this.target = target;
    this.flipped = flipped;
    this.category = category;
    this.thrownIntoBucket = thrownIntoBucket;
  }
}
