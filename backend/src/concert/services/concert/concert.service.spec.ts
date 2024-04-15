import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Concert } from 'src/typeorm/entities/Concert';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { NotFoundException } from '@nestjs/common';
import { ReserveStatus } from 'src/utils/types';

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepositoryMock: any;
  let reservationRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ConcertService>(ConcertService);
    concertRepositoryMock = module.get(getRepositoryToken(Concert));
    reservationRepositoryMock = module.get(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createConcert', () => {
    it('should create a concert', async () => {
      const createConcertDto = {
        name: 'Concert Name',
        description: 'desc',
        seat: 100,
      };
      const createdConcert = { id: 1, ...createConcertDto };
      concertRepositoryMock.create.mockReturnValue(createdConcert);
      concertRepositoryMock.save.mockResolvedValue(createdConcert);

      expect(await service.createConcert(createConcertDto)).toEqual(
        createdConcert,
      );
    });
  });

  describe('DeleteConcertById', () => {
    it('should throw NotFoundException if concert not found', async () => {
      const concertId = 1;
      concertRepositoryMock.findOne.mockResolvedValue(null);

      await expect(service.DeleteConcertById(concertId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('FetchAllConcertAdminPov', () => {
    it('should fetch all concerts with owner flag', async () => {
      const adminId = 1;
      const concerts = [
        { id: 1, name: 'Concert 1', createBy: adminId },
        { id: 2, name: 'Concert 2', createBy: adminId },
      ];
      concertRepositoryMock.find.mockResolvedValue(concerts);

      const result = await service.FetchAllConcertAdminPov(adminId);

      expect(result).toEqual(
        concerts.map((concert) => ({ ...concert, isOwner: true })),
      );
    });
  });

  describe('FetchAllConcertUserPov', () => {
    it('should fetch all concerts with reservation status for a user', async () => {
      const userId = 1;
      const reservations = [{ concertId: 1 }, { concertId: 2 }];
      const concerts = [
        { id: 1, name: 'Concert 1' },
        { id: 2, name: 'Concert 2' },
      ];
      reservationRepositoryMock.query.mockResolvedValue(reservations);
      concertRepositoryMock.find.mockResolvedValue(concerts);

      const result = await service.FetchAllConcertUserPov(userId);

      expect(result).toEqual(
        concerts.map((concert) => ({ ...concert, IsReserve: true })),
      );
    });
  });

  describe('createReservation', () => {
    it('should throw NotFoundException if concert not found', async () => {
      const createReservationDto = {
        concertId: 1,
        reserverId: 1,
        status: ReserveStatus.RESERVED,
      };
      concertRepositoryMock.findOne.mockResolvedValue(null);

      await expect(
        service.createReservation(createReservationDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // Add similar tests for other service methods
});
