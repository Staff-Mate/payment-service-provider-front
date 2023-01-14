import {BankDto} from "../../auth/dto/bank.dto";

export class InfoDto {
  private firstName: string;
  private lastName: string;
  private bank: BankDto;
  private errorUrl: string;
  private failedUrl: string;
  private successUrl: string;
}
