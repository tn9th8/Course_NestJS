import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return (
      next
        // data là lấy về từ return của controller, interceptor sẽ xử lý data
        // interceptor chayk 2 lần: lần 1 sau khi gửi req, lần 2 trước khi gửi response
        // hàm map(data) lấy date của controller vào lần 2
        .handle()
        .pipe(
          map((data) => ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data.message,
            data: {
              result: data.result,
              meta: {}, // if this is supposed to be the actual return then replace {} with data.result
            },
          })),
        )
    );
  }
}
