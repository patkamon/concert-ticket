import { Controller } from '@nestjs/common';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  // @POST admin create concert
  // @DELETE admin del concert

  // @GET user get all concert
  // @POST user reserved/cancel concert

  // @GET history get history both admin user
}
