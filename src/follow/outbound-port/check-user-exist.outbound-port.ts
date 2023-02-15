export interface CheckUserExistOutboundPort {
  execute(userId: number): Promise<boolean>;
}
