import { Module } from '@nestjs/common';
import { ConcertController } from './controllers/concert/concert.controller';
import { ConcertService } from './services/concert/concert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from 'src/typeorm/entities/Concert';
import { Reservation } from 'src/typeorm/entities/Reservation';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Reservation])],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
