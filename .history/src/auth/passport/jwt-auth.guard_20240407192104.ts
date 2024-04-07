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

  // to simply extend the default error handling or authentication logic.
  // For this, you can extend the built-in class and override methods within a sub-class:

  canActivate(context: ExecutionContext) {
    // Overide
    // Add your custom authentication logic here
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

  // Overide
  // Add your custom authentication logic here
  handleRequest(err, user, info) {
    // bắn ra nếu có lỗi
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Không có Token ở Bearer Token trong Request Header / Token không hợp lệ',
        )
      );
    }
    return user;
  }
}
