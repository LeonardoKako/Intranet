import { Module } from '@nestjs/common';
import { LoginsService } from './logins.service';
import { LoginsController } from './logins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Login]), CategoryModule],
  controllers: [LoginsController],
  providers: [LoginsService],
  exports: [LoginsService],
})
export class LoginsModule {}
