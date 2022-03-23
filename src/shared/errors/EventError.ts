export class EventError {
  public readonly value: number;
  public readonly statusCode: number;

  constructor(value: number, statusCode = 400) {
    this.value = value;
    this.statusCode = statusCode;
  }
}
