import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomsDto {
  @IsString()
  @IsNotEmpty()
  public n_quarto?: string;

  @IsNumber()
  @IsNotEmpty()
  public valor?: number;

  @IsBoolean()
  @IsNotEmpty()
  public situacao?: boolean;

  @IsString()
  public descricao?: string;

  @IsString()
  @IsNotEmpty()
  public data_entrada?: string;

  @IsString()
  @IsNotEmpty()
  public data_saida?: string;
}
