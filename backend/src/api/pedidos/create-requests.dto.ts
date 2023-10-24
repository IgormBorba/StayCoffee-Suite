import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateRequestsDto {
  @IsNumber()
  @IsNotEmpty()
  public valor?: number;

  @IsString()
  @IsNotEmpty()
  public paymentmethod: string;

  @IsBoolean()
  @IsNotEmpty()
  public pago: boolean;
}
