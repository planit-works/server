import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../enums/order';

enum SortBy {
  Date = 'createdAt',
  Nickname = 'nickname',
}

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @ApiPropertyOptional({ enum: SortBy, default: 'createdAt' })
  @IsEnum(SortBy)
  sortBy: SortBy = SortBy.Date;

  @ApiPropertyOptional({
    minimum: 5,
    maximum: 30,
    default: 10,
  })
  @IsInt()
  @Min(5)
  @Max(30)
  @IsOptional()
  @Type(() => Number)
  limit = 5;

  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  @IsOptional()
  order: Order = Order.DESC;

  public getPage(): number {
    return this.page;
  }

  public getLimit(): number {
    return this.limit;
  }

  public getOrder(): string {
    return this.order;
  }
  public getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  public getSortBy(): string {
    return this.sortBy;
  }
}
