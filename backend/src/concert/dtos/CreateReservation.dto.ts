import { ReserveStatus } from 'src/utils/types';

export class CreateReservationDto {
  concertId: number;
  status?: ReserveStatus;
}
