import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoginsService } from './logins.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller('logins')
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) {}

  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginsService.create(createLoginDto);
  }

  @Get()
  findAll() {
    return this.loginsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginsService.update(id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginsService.remove(id);
  }
}
