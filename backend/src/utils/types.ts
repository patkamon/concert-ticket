export type CreateConcertParams = {
  name: string;
  description: string;
  seat: number;
};

export type CreateReservationParams = {
  concertId: number;
  reserverId: number;
  status?: ReserveStatus;
};

export enum ReserveStatus {
  RESERVED = 'Reserved',
  CANCELED = 'Canceled',
}
