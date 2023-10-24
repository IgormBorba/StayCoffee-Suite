import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public nome?: string;

  @IsString()
  @IsNotEmpty()
  public cidade?: string;

  @IsString()
  @IsNotEmpty()
  public celular?: string;
}
