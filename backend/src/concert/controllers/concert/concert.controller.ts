import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateConcertDto } from 'src/concert/dtos/CreateConcert.dto';
import { CreateReservationDto } from 'src/concert/dtos/CreateReservation.dto';
import { ConcertService } from 'src/concert/services/concert/concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get() // getAllConcert
  getAllConcert() {
    return this.concertService.FetchAllConcert();
  }

  @Post('reserve') // reserve/ cancel concert
  reserveConcert(
    @Headers() headers,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    // check if role is user
    if (headers.role !== 'User') {
      throw new HttpException(
        'Only user can make reservation',
        HttpStatus.FORBIDDEN,
      );
    }
    this.concertService.createReservation(createReservationDto);
  }

  @Post('create') // create concert
  createConcert(
    @Headers() headers,
    @Body() createConcertDto: CreateConcertDto,
  ) {
    // check if role is admin
    if (headers.role !== 'Admin') {
      throw new HttpException(
        'Only Admin allow to access this endpoint',
        HttpStatus.FORBIDDEN,
      );
    }
    this.concertService.createConcert(createConcertDto);
  }

  @Delete('/delete/:id') // delete concert
  async deleteConcert(@Headers() headers, @Param('id') id: number) {
    // check if role is admin
    if (headers.role !== 'Admin') {
      throw new HttpException(
        'Only Admin allow to access this endpoint',
        HttpStatus.FORBIDDEN,
      );
    }
    const response = await this.concertService.DeleteConcertById(id);
    if (response == null) {
      throw new HttpException('Concert ID not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get() // get all reservation historu
  getReservationHistory() {}
}
