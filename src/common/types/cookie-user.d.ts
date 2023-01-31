import { User } from '../../user/entities/user.entity';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
