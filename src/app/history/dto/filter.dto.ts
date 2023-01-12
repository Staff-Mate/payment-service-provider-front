export class FilterDto {
  private serviceId: string;
  private status: string;
  private startDate: Date;
  private endDate: Date;
  private page: number;
  private pageSize: number;


  constructor(serviceId: string, status: string, startDate: Date, endDate: Date, page: number, pageSize: number) {
    this.serviceId = serviceId;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.page = page;
    this.pageSize = pageSize;
  }
}
