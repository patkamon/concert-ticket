import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertService } from 'src/concert/services/concert/concert.service';

describe('ConcertController', () => {
  let controller: ConcertController;

  const mockConcertService = {
    createConcert: jest.fn((header, dto) => {
      if (header.role == 'Admin') {
        console.log(dto);
        return undefined;
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [ConcertService],
    })
      .overrideProvider(ConcertService)
      .useValue(mockConcertService)
      .compile();

    controller = module.get<ConcertController>(ConcertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create concert', () => {
    expect(
      controller.createConcert(
        { role: 'Admin' },
        {
          name: 'test',
          description: 'desc',
          seat: 10,
        },
      ),
    ).toEqual(undefined);
  });
});
