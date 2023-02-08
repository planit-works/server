import {
  IsBoolean,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpsertTodoReqDto {
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  date: string;

  @IsString()
  title: string;

  @IsBoolean()
  done: boolean;
}
