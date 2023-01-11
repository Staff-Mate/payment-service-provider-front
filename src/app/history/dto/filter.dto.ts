export class FilterDto {

  private merchantId: string;
  private service: string;
  private status: string;
  private startDate: Date;
  private endDate: Date;


  constructor(merchantId: string, service: string, status: string, startDate: Date, endDate: Date) {
    this.merchantId = merchantId;
    this.service = service;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
