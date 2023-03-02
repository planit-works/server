// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { UserService } from '../../user/services/user.service';

// @Injectable()
// export class CurrentUserMiddleware implements NestMiddleware {
//   constructor(private userService: UserService) {}
//   async use(req: Request, res: Response, next: NextFunction) {
//     const { userId } = req.session || {};

//     if (userId) {
//       const user = await this.userService.findById(userId);
//       // @ts-ignore
//       req.currentUser = user;
//     }

//     next();
//   }
// }
