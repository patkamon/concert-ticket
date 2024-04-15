import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Concert } from 'src/typeorm/entities/Concert';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { ConcertService } from 'src/concert/services/concert/concert.service';

describe('ConcertController', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
