// tslint:disable-next-line:class-name
export class Bill_service {
  // tslint:disable-next-line:variable-name
  private _nameService: string;
  // tslint:disable-next-line:variable-name
  private _priceService: number;
  // tslint:disable-next-line:variable-name
  private _quantityBook: number;

  constructor(nameService: string, priceService: number, quantityBooked: number) {
    this._nameService = nameService;
    this._priceService = priceService;
    this._quantityBook = quantityBooked;
  }

  get nameService(): string {
    return this._nameService;
  }

  set nameService(value: string) {
    this._nameService = value;
  }

  get priceService(): number {
    return this._priceService;
  }

  set priceService(value: number) {
    this._priceService = value;
  }

  get quantityBook(): number {
    return this._quantityBook;
  }

  set quantityBook(value: number) {
    this._quantityBook = value;
  }
}
