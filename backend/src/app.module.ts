// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LoginsModule } from './logins/logins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'leo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule, // Adicione este módulo!
    CategoryModule,
    LoginsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
