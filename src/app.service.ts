import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // model: query database
    return 'Hello World! & Hỏi Dân IT';
  }
}
