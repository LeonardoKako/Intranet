import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateLoginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(
  OmitType(CreateLoginDto, ['categoryId'] as const),
) {}
