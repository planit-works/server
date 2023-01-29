import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class UserAvatarValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.validate(value)) {
      throw new BadRequestException('유효하지 않은 요청');
    }

    // 변환할 로직
    return value;
  }

  private validate(value: string) {
    if (!value) {
      // 로직
      return false;
    }
    return true;
  }
}
