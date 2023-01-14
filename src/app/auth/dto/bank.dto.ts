export class BankDto{
  public id: string;
  public name: string;
  public bankUrl: string;


  constructor(id: string, name: string, bankUrl: string) {
    this.id = id;
    this.name = name;
    this.bankUrl = bankUrl;
  }
}
