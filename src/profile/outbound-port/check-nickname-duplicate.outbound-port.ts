export interface CheckNicknameDuplicateOutboundPort {
  execute(nickname: string): Promise<boolean>;
}
