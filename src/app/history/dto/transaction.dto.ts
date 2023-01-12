export class TransactionDto{
  serviceName: string;
  amount: number;
  timestamp: Date;
  status: string;


  constructor(service: string, amount: number, date: Date, status: string) {
    this.serviceName = service;
    this.amount = amount;
    this.timestamp = date;
    this.status = status;
  }
}
