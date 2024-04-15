import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateConcertDto } from 'src/concert/dtos/CreateConcert.dto';
import { ConcertService } from 'src/concert/services/concert/concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get() // getAllConcert
  getAllConcert() {}

  @Post() // reserve/ cancel concert
  reserveConcert() {}

  @Post() // create concert
  createConcert(@Body() createConcertDto: CreateConcertDto) {
    this.concertService.createConcert(createConcertDto);
  }

  @Delete() // delete concert
  deleteConcert() {}

  @Get() // get all reservation historu
  getReservationHistory() {}
}
