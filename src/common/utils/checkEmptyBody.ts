import { BadRequestException, RawBodyRequest } from '@nestjs/common';

export const checkEmptyBody = (body: RawBodyRequest<any>) => {
  let bodyLength = 0;
  for (const _ in body) {
    bodyLength++;
  }
  if (bodyLength === 0) {
    throw new BadRequestException('Bad Request');
  }
  return;
};
