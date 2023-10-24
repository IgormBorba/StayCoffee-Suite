import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from '.././../../common/helper/messages.helper';
import { RegExHelper } from '.././../../common/helper/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;
}
