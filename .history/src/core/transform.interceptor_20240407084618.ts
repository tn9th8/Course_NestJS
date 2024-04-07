import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from 'src/decorator/customize';

export interface Response<T> {
  statusCode: number;
  message?: string; // optional
  data: any;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // ta dùng Reflector để lấy ra Metadata
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // định nghĩa kiểu trả về là Interface Response
    return (
      next
        // data là lấy về từ return của controller, interceptor sẽ xử lý data
        // interceptor chayk 2 lần: lần 1 trước khi gửi req, lần 2 trước khi gửi response
        // hàm map(data) lấy date của controller vào lần 2
        .handle()
        .pipe(
          map((data) => ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            message:
              this.reflector.get<string>(
                RESPONSE_MESSAGE_KEY, // lấy ra bằng key
                context.getHandler(),
              ) || '',
            data: data,
            // {
            //   result: data.result,
            //   meta: {}, // if this is supposed to be the actual return then replace {} with data.result
            // },
          })),
        )
    );
  }
}
