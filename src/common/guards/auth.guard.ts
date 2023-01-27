// import { CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// // NestJS의 UserGuard의 인자로 전달할 경우 truthy 값일 때 통과, 그렇지 않을 때는 403 에러를 반환한다.
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return request;
//   }
// }
