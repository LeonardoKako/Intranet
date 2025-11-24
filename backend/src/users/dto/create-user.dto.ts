import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(80)
  fullName: string;

  @IsEmail()
  @MaxLength(80)
  email: string;

  @IsString()
  @MaxLength(80)
  nickname: string;

  @IsString()
  password: string;
}
