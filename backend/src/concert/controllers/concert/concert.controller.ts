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
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    this.concertService.createConcert(createConcertDto);
  }

  @Delete(':id') // delete concert
  async deleteConcert(@Headers() headers, @Param('id') id: number) {
    // check if role is admin
    if (headers.role !== 'Admin') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const response = await this.concertService.DeleteConcertById(id);
    if (response == null) {
      throw new HttpException('Concert ID not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get() // get all reservation historu
  getReservationHistory() {}
}
