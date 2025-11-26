import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLoginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  url: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(8)
  categoryId: string;
}
