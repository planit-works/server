export interface CreateScheduleInboundPortInputDto {
  userId: number;
  ymd: string;
  title: string;
  description?: string;
  startAt?: string;
  endAt?: string;
}

export interface CreateScheduleInboundPortOutputDto {
  scheduleId: number;
}

export interface CreateScheduleInboundPort {
  execute(
    params: CreateScheduleInboundPortInputDto,
  ): Promise<CreateScheduleInboundPortOutputDto>;
}
