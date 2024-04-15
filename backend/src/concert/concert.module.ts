import { Module } from '@nestjs/common';
import { ConcertController } from './controllers/concert/concert.controller';
import { ConcertService } from './services/concert/concert.service';

@Module({
  controllers: [ConcertController],
  providers: [ConcertService]
})
export class ConcertModule {}
