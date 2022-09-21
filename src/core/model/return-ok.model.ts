export class ReturnOKModel<T> {
  public statusCode = 200
  constructor(public data: T) {
    this.data = data;
  }
}