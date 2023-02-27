// import { UserService } from '../services/user.service';
// import {
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
//   Injectable,
// } from '@nestjs/common';

// // 쿠키가 아닌 다른 프로토콜을 사용할 경우 쓰일 인터셉터
// @Injectable()
// export class GetUserInterceptor implements NestInterceptor {
//   constructor(private userService: UserService) {}

//   async intercept(context: ExecutionContext, handler: CallHandler) {
//     const request = context.switchToHttp().getRequest();
//     const { userId } = request.blah || {};

//     if (userId) {
//       const user = await this.userService.findById(+userId);
//       request.user = user;
//     }

//     // express 미들웨어의 next()와 같은 역할
//     return handler.handle();
//   }
// }
