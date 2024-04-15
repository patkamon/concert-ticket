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

  async createConcert(createConcertDto: CreateConcertParams) {
    const newConcert = this.concertRepository.create({ ...createConcertDto });
    return await this.concertRepository.save(newConcert);
  }

  async DeleteConcertById(id: number) {
    const toDeleteConcert = await this.concertRepository.findOneBy({ id: id });
    if (toDeleteConcert == null) {
      return null;
    }
    return await this.concertRepository.remove(toDeleteConcert);
  }
}
