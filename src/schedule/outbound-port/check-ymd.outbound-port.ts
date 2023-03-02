export interface CheckYmdOutboundPortOutputDto {
  ymdId: number;
}

export interface CheckYmdOutboundPort {
  execute(ymd: string): Promise<CheckYmdOutboundPortOutputDto>;
}
