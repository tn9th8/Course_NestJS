import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Guard sẽ check ta sẽ sử dụng jwt strategy

  constructor(private reflector: Reflector) {
    // ta sẽ dùng class Reflector (phản chiếu) để lấy Metadate ra
    super();
  }

  canActivate(context: ExecutionContext) {
    // truyền key vào hàm này để lấy value của Metadate
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // nếu isPublic là true thì JwtAuthGuard trả về true, tức là đi tiếp
    if (isPublic) {
      return true;
    }
    // nếu không đề framework sẽ làm
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Không có Bearer Token ở Header Request / Token không hợp lệ',
        )
      );
    }
    return user;
  }
}
