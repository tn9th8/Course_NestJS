import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // code đến database

    return 'Hello World! & Hỏi Dân IT';
  }
}
