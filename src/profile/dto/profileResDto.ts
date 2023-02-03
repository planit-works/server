import { Expose, Transform } from 'class-transformer';

export class ProfileResDto {
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
