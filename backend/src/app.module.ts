import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './typeorm/entities/Concert';
import { ConcertModule } from './concert/concert.module';
import { Reservation } from './typeorm/entities/Reservation';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password', // YOURPASSWORD
      database: 'test',
      entities: [Concert, Reservation],
      synchronize: true,
    }),
    ConcertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
