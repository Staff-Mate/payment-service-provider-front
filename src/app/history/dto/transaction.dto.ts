export class TransactionDto{
  service: string;
  description: string;
  amount: number;
  date: Date;
  status: string;


  constructor(service: string, description: string, amount: number, date: Date, status: string) {
    this.service = service;
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.status = status;
  }
}
