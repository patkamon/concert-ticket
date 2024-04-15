import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateConcertDto } from 'src/concert/dtos/CreateConcert.dto';
import { ConcertService } from 'src/concert/services/concert/concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get() // getAllConcert
  getAllConcert() {}

  @Post() // reserve/ cancel concert
  reserveConcert() {}

  @Post('create') // create concert
  createConcert(
    @Headers() headers,
    @Body() createConcertDto: CreateConcertDto,
  ) {
    // check if role is admin
    if (headers.role !== 'Admin') {
      console.log(headers);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    this.concertService.createConcert(createConcertDto);
  }

  @Delete() // delete concert
  deleteConcert() {}

  @Get() // get all reservation historu
  getReservationHistory() {}
}
