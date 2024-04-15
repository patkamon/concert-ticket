import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcertService {
  getHello(): string {
    return 'Hello World!';
  }
}
