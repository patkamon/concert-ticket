import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from 'src/typeorm/entities/Concert';
import { CreateConcertParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert) private concertRepository: Repository<Concert>,
  ) {}

  createConcert(createConcertDto: CreateConcertParams) {
    const newConcert = this.concertRepository.create({ ...createConcertDto });

    return this.concertRepository.save(newConcert);
  }
}
