import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from 'src/typeorm/entities/Concert';
import { Reservation } from 'src/typeorm/entities/Reservation';
import {
  CreateConcertParams,
  CreateReservationParams,
  ReserveStatus,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert) private concertRepository: Repository<Concert>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createConcert(createConcertDto: CreateConcertParams) {
    const newConcert = this.concertRepository.create({ ...createConcertDto });
    return await this.concertRepository.save(newConcert);
  }

  async DeleteConcertById(id: number) {
    const toDeleteConcert = await this.concertRepository.findOneBy({ id: id });
    // concert notfound
    if (!toDeleteConcert) {
      //TODO: ERROR HANDLING

      return null;
    }
    return await this.concertRepository.remove(toDeleteConcert);
  }

  async FetchAllConcertAdminPov(adminId: number) {
    const entities = await this.concertRepository.find();

    entities.forEach((entity) => {
      entity.isOwner = entity.createBy == adminId;
    });
    return entities;
  }

  async FetchAllConcertUserPov(userId: number) {
    const query = `
      SELECT concertId
      FROM reservation r
      WHERE r.status = "RESERVED" AND r.reserverId = ${userId}
      AND r.concertId IN (
          SELECT DISTINCT concertId
          FROM reservation
          WHERE reserverId = ${userId}
      )
      AND r.created_at = (
          SELECT MAX(created_at)
          FROM reservation
          WHERE reserverId = ${userId}
          AND concertId = r.concertId
      );
    `;

    const rows = await this.reservationRepository.query(query);
    const result: { [key: number]: null } = {};

    rows.forEach((row: { concertId: number }) => {
      result[String(row.concertId)] = 'reserved';
    });

    const entities = await this.concertRepository.find();

    entities.forEach((entity) => {
      if (result[String(entity.id)] == 'reserved') {
        entity.IsReserve = true;
      } else {
        entity.IsReserve = false;
      }
    });

    return entities;
  }

  async FetchAllReservationById(id: number) {
    return await this.reservationRepository.findBy({ reserverId: id });
  }

  async FetchAllReservation() {
    return await this.reservationRepository.find();
  }

  async createReservation(createReservationDto: CreateReservationParams) {
    const toReserveConcert = await this.concertRepository.findOneBy({
      id: createReservationDto.concertId,
    });
    // concert notfound
    if (!toReserveConcert) {
      //TODO: ERROR HANDLING
      return null;
    }
    // check for cancel
    const findReservation = await this.reservationRepository.findOne({
      where: [{ reserverId: 0 }, { concertId: createReservationDto.concertId }],
      order: { created_at: 'DESC' },
    });
    // if not reserve before or already canceled then reserve
    if (
      findReservation == null ||
      findReservation.status == ReserveStatus.CANCELED
    ) {
      const newReservation = this.reservationRepository.create({
        ...createReservationDto,
      });
      return await this.reservationRepository.save(newReservation);
    }
    // if already reserve then cancel
    if (findReservation.status == ReserveStatus.RESERVED) {
      createReservationDto.status = ReserveStatus.CANCELED;
      const newReservation = this.reservationRepository.create({
        ...createReservationDto,
      });
      return await this.reservationRepository.save(newReservation);
    }
    //TODO: ERROR HANDLING
  }
}
